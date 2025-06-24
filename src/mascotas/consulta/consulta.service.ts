import { ForbiddenException, Inject, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

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

  findOne(id: number) {
    return `This action returns a #${id} consulta`;
  }

  update(id: number, updateConsultaDto: UpdateConsultaDto) {
    return `This action updates a #${id} consulta`;
  }

  remove(id: number) {
    return `This action removes a #${id} consulta`;
  }
}
