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

    const { valido, motivo } = await this.client
      .send('empresas.validar-empresa-admin', {
        empresa_id: createConsultaDto.empresa_id,
        admin_id: user.id,
      })
      .toPromise();

    if (!valido) {
      throw new ForbiddenException('Empresa no autorizada para este usuario');
    }
    // Validar que el usuario tiene acceso a la empresa (opcional si ya lo hiciste antes)

    this.logger.debug('Buscando historia clínica con:', {
      hic_id: createConsultaDto.historiaClinica_id,
      empresa_id: createConsultaDto.empresa_id,
    });
    const historial = await this.historiaClinica.findFirst({
      where: {
        hic_id: createConsultaDto.historiaClinica_id,
        empresa_id: createConsultaDto.empresa_id,
      },
    });

    if (!historial) {
      this.logger.warn('Historial no encontrado');
      throw new NotFoundException('Historial clínico no encontrado');
    }

    const consulta = await this.consulta.create({
      data: {
        con_fecha: new Date(createConsultaDto.con_fecha),
        con_motivo: createConsultaDto.con_motivo,
        con_sintomas: createConsultaDto.con_sintomas,
        con_diagnostico: createConsultaDto.con_diagnostico,
        con_tratamiento: createConsultaDto.con_tratamiento,
        con_recomendaciones: createConsultaDto.con_recomendaciones,
        historiaClinica_id: createConsultaDto.historiaClinica_id,
        empresa_id: createConsultaDto.empresa_id,
        createdBy: user.id,
      },
    });

    return consulta;
  }


  findAll() {
    return `This action returns all consulta`;
  }

  async findOneConsulta(con_id: number,userId: number) {

    
    const consulta = await this.consulta.findFirst({
      where:{
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
