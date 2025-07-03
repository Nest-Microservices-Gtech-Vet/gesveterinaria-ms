import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class ConsultaService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('GestVeterinaria-Service-Mascotas');
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {
    super();
  }
  onModuleInit() {
    this.$connect
    this.logger.log('gesVeterinania Mascotas conectado- Consultas')
  }


  async create(createConsultaDto: CreateConsultaDto, user: { id: number }) {
    const { patologiasIds = [], ...dto } = createConsultaDto;

    // Validación de empresa como ya lo haces
    const { valido } = await this.client.send('empresas.validar-empresa-admin', {
      empresa_id: dto.empresa_id,
      admin_id: user.id,
    }).toPromise();

    if (!valido) {
      throw new ForbiddenException('Empresa no autorizada para este usuario');
    }

    // Validación de historia clínica
    const historial = await this.historiaClinica.findFirst({
      where: {
        hic_id: dto.historiaClinica_id,
        empresa_id: dto.empresa_id,
      },
    });

    if (!historial) {
      throw new NotFoundException('Historial clínico no encontrado');
    }


    const ultimaConsulta = await this.consulta.aggregate({
      where: { mascota_id: createConsultaDto.mascota_id },
      _max: { con_numero_mascota: true },
    });

    const nuevoNumero = (ultimaConsulta._max.con_numero_mascota ?? 0) + 1;

    // Crear consulta
    const consulta = await this.consulta.create({
      data: {
        ...dto,
        mascota_id: createConsultaDto.mascota_id,
        con_fecha: new Date(dto.con_fecha),
        con_numero_mascota: nuevoNumero,
        createdBy: user.id,
      },
    });

    // Crear relaciones con patologías
    if (patologiasIds.length > 0) {
      const relaciones = patologiasIds.map((patologiaId) => ({
        consulta_id: consulta.con_id,
        patologia_id: patologiaId,
        empresa_id: dto.empresa_id,
        createdBy: user.id,
      }));

      await this.consultaPatologia.createMany({
        data: relaciones,
        skipDuplicates: true, // evita errores si ya existe
      });
    }

    return consulta;
  }



  findAll() {
    return `This action returns all consulta`;
  }

  async findOneConsulta(con_id: number, userId: number) {


    const consulta = await this.consulta.findFirst({
      where: {
        con_id
      }
    });
    if (!consulta) {
      throw new RpcException({
        message: `[gesveterinaria-ms]Consulta  con el # ${con_id} no encontrado`
      })
    }
    return consulta;
  }

  async update(con_id: number, updateConsultaDto: UpdateConsultaDto, updatedBy: number, admin_id: number,) {
    try {
      if (!con_id) {
        throw new BadRequestException('🚫 No se encontró el ID de la consulta para actualizar.');
      }

      const existingConsulta = await this.consulta.findUnique({ where: { con_id } });

      if (!existingConsulta) {
        throw new BadRequestException(`🚫 No se encontró ninguna consulta con ID: ${con_id}`);
      }

      const { valido } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: existingConsulta.empresa_id,
          admin_id,
        })
        .toPromise();

      if (!valido) {
        throw new ForbiddenException('No autorizado para modificar esta consulta');
      }
      const consultaUpdated = await this.consulta.update({
        where: { con_id },
        data: {
          ...updateConsultaDto,
          updatedBy,
        }
      });
      console.log(`✅ consulta actualizada correctamente: ${updateConsultaDto.con_motivo}`);
      return consultaUpdated;
    } catch (error) {
      console.error('❌ Error al actualizar consulta:', error);
      throw new RpcException({
        message: 'Error al actualizar la consulta',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} consulta`;
  }
}
