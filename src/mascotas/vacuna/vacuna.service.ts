import { ForbiddenException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { date } from 'joi';

@Injectable()
export class VacunaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('GestVeterinaria-Service-Vacunas');
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {
    super();
  }
  onModuleInit() {
    this.$connect
    this.logger.log('gesVeterinania Mascotas conectado')
  }


  async createVacuna(createVacunaDto: CreateVacunaDto, user: { id: number }) {
    try {
      const { valido, motivo } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: createVacunaDto.empresa_id,
          admin_id: user.id,
        })
        .toPromise();

      if (!valido) {
        this.logger.warn(`Empresa no válida para el admin: ${motivo}`);
        throw new ForbiddenException('Empresa no autorizada para este usuario.');
      }

      const consulta = await this.consulta.findFirst({
        where: {
          empresa_id: createVacunaDto.empresa_id,
          mascota_id: createVacunaDto.mascota_id,
          con_numero_mascota: createVacunaDto.numeroConsulta,
        },
      });

      if (!consulta) {
        throw new NotFoundException('No se encontró la consulta para esta mascota');
      }

      const vacunaCrear = await this.vacuna.create({
        data: {
          vac_nombre: createVacunaDto.vac_nombre,
          vac_tipo: createVacunaDto.vac_tipo,
          vac_fecha: new Date(createVacunaDto.vac_fecha),
          vac_proxima: createVacunaDto.vac_proxima ? new Date(createVacunaDto.vac_proxima) : null,
          vac_lote: createVacunaDto.vac_lote,
          vac_foto: createVacunaDto.vac_foto,
          vac_observacion: createVacunaDto.vac_observacion,
          empresa_id: createVacunaDto.empresa_id,
          consulta_id: consulta.con_id,
          createdBy: user.id


        }
      });
      return vacunaCrear;
    } catch (error) {
      this.logger.error('Error en registro de vacuna ', error.stack || error.message);
      throw new InternalServerErrorException('No se pudo registro de vacuna ');
    }
  }

  findAll() {
    return `This action returns all vacuna`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vacuna`;
  }

  update(id: number, updateVacunaDto: UpdateVacunaDto) {
    return `This action updates a #${id} vacuna`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacuna`;
  }
}
