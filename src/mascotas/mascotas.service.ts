import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class MascotasService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('GestVeterinaria-Service-Mascotas');
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {
    super();
  }
  onModuleInit() {
    this.$connect
    this.logger.log('gesVeterinania Mascotas conectado')
  }

  async create(createMascotaDto: CreateMascotaDto, user: { id: number }) {
    try {
      this.logger.debug('DTO recibido:', createMascotaDto);

      this.logger.log(`Validando empresa ${createMascotaDto.empresa_id} para el admin ${user.id}`)
      this.logger.debug('DTO recibido:', createMascotaDto);

      const { valido, motivo } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: createMascotaDto.empresa_id,
          admin_id: user.id,
        })
        .toPromise();

      if (!valido) {
        this.logger.warn(`Empresa no válida para el admin: ${motivo}`);
        throw new ForbiddenException('Empresa no autorizada para este usuario.');
      }

      const mascotaCrear = await this.mascota.create({
        data: {
          mas_nombre: createMascotaDto.mas_nombre,
          mas_fechaNac: createMascotaDto.mas_fechaNac,
          mas_peso: createMascotaDto.mas_peso,
          mas_color: createMascotaDto.mas_color,
          mas_esterilizado: !!createMascotaDto.mas_esterilizado,
          mas_microchip: createMascotaDto.mas_microchip,
          mas_foto: createMascotaDto.mas_foto,
          mas_notas: createMascotaDto.mas_notas,
          empresa_id: createMascotaDto.empresa_id,
          activo: createMascotaDto.activo ?? true,
          createdBy: user.id,
          especie: {
            connect: { esp_id: createMascotaDto.especie_id }
          },
          raza: {
            connect: { raz_id: createMascotaDto.raza_id }
          },
          propietario: {
            connect: { cli_id: createMascotaDto.cliente_id }
          }


        }
      });
      return mascotaCrear
    } catch (error) {
      this.logger.error('Error en creación de mascota', error.stack || error.message);
      throw new InternalServerErrorException('No se pudo crear el mascota');
    }
  }

  async findAll(adminId: number, empresaId: number) {
  // 1. Obtener empresas asociadas al admin
  const empresas = await this.client.send('empresas.obtener-empresas-por-admin', { admin_id: adminId }).toPromise();

  if (!empresas || empresas.length === 0) return [];

  const empresaIds = empresas.map(e => e.emp_id);

  // 2. Validar que la empresa actual está dentro de las que el admin puede ver
  if (!empresaIds.includes(empresaId)) {
    throw new UnauthorizedException('No tiene acceso a esta empresa');
  }

  // 3. Buscar mascotas solo de la empresa actual
  return this.mascota.findMany({
    where: {
      empresa_id: empresaId,
      activo: true,
    },
    orderBy: { created_at: 'desc' },
    include: { propietario: true }
  });
}





  async findOne(mas_id: number, userId: number) {
    const mascota = await this.mascota.findFirst({
      where: {
        mas_id
      }
    });
    if (!mascota) {
      throw new RpcException({
        message: `[gesveterinaria-ms]mascota  con el # ${mas_id} no encontrado`
      })
    }

    // Validar si ese user (admin) tiene acceso a esa empresa
    const { valido } = await this.client.send('empresas.validar-empresa-admin', {
      empresa_id: mascota.empresa_id,
      admin_id: userId,
    }).toPromise();

    if (!valido) {
      throw new RpcException({
        message: `El usuario no tiene acceso a la empresa ${mascota.empresa_id}`,
      });
    }
    return mascota;
  }

  async update(
    mas_id: number,
    updateMascotaDto: UpdateMascotaDto,
    updatedBy: number,
    admin_id: number
  ) {
    try {
      if (!mas_id) {
        throw new BadRequestException('🚫 No se encontró el ID de la mascota para actualizar.');
      }

      const existingMascota = await this.mascota.findUnique({ where: { mas_id } });

      if (!existingMascota) {
        throw new BadRequestException(`🚫 No se encontró ninguna mascota con ID: ${mas_id}`);
      }

      const { valido } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: existingMascota.empresa_id,
          admin_id,
        })
        .toPromise();

      if (!valido) {
        throw new ForbiddenException('No autorizado para modificar esta mascota');
      }

      // ✅ Desestructuramos campos que requieren conexión
      const {
        especie_id,
        raza_id,
        cliente_id,
        createdBy,
        updatedBy: dtoUpdatedBy,
        empresa_id, // si lo usas en algún otro contexto
        ...restoCampos
      } = updateMascotaDto;

      const data: Prisma.MascotaUpdateInput = {
        ...restoCampos,
        updatedBy,

        // Solo conectamos relaciones si los valores están presentes
        ...(especie_id && {
          especie: {
            connect: { esp_id: especie_id },
          },
        }),

        ...(raza_id && {
          raza: {
            connect: { raz_id: raza_id },
          },
        }),

        ...(cliente_id && {
          propietario: {
            connect: { cli_id: cliente_id },
          },
        }),
      };

      const mascotaUpdated = await this.mascota.update({
        where: { mas_id },
        data,
      });

      return mascotaUpdated;
    } catch (error) {
      console.error('❌ Error al actualizar mascota:', error);
      throw new RpcException({
        message: 'Error al actualizar la mascota',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }


  async remove(mas_id: number, admin_id: number, updatedBy: number) {
    try {
      const mascota = await this.mascota.findUnique({
        where: { mas_id },
      });

      if (!mascota) {
        throw new NotFoundException(`mascota con ID ${mas_id} no encontrado.`);
      }

      const { valido } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: mascota.empresa_id,
          admin_id,
        })
        .toPromise();

      if (!valido) {
        throw new ForbiddenException('No autorizado para eliminar este cliente.');
      }

      const mascotaEliminado = await this.mascota.update({
        where: { mas_id },
        data: {
          activo: false,
          updatedBy,
        },
      });

      return {
        message: `Cliente con ID ${mas_id} eliminado lógicamente.`,
        mascota: mascotaEliminado,
      };
    } catch (error) {
      console.error('❌ Error al eliminar cliente:', error);
      throw new RpcException({
        message: 'Error al eliminar cliente',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
