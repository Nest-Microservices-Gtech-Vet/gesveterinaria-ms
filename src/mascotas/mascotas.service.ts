import { ForbiddenException, Inject, Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

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
          mas_esterilizado: !!createMascotaDto.mas_esterilizado ,
          mas_microchip: createMascotaDto.mas_microchip,
          mas_foto: createMascotaDto.mas_foto,
          mas_notas: createMascotaDto.mas_notas,
          empresa_id:createMascotaDto.empresa_id,
          activo: createMascotaDto.activo?? true,
          createdBy: user.id,
          especie: {
            connect:{ esp_id: createMascotaDto.especie_id}
          },
          raza: {
            connect:{ raz_id: createMascotaDto.raza_id}
          },
          propietario: {
            connect:{ cli_id:createMascotaDto.cliente_id}
          }

          
        }
      });
      return mascotaCrear
    } catch (error) {
      this.logger.error('Error en creación de mascota', error.stack || error.message);
            throw new InternalServerErrorException('No se pudo crear el mascota');
    }
  }

  findAll() {
    return `This action returns all mascotas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, updateMascotaDto: UpdateMascotaDto) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}
