import { ForbiddenException, Inject, Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MedicamentoService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('GestVeterinaria-Service-Mascotas-medicamento');
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {
    super();
  }
  onModuleInit() {
    this.$connect
    this.logger.log('gesVeterinania Mascotas conectado')
  }


  async createMedicamento(createMedicamentoDto: CreateMedicamentoDto, user: { id: number }) {

    try {
      const { valido, motivo } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: createMedicamentoDto.empresa_id,
          admin_id: user.id,
        })
        .toPromise();

      if (!valido) {
        this.logger.warn(`Empresa no válida para el admin: ${motivo}`);
        throw new ForbiddenException('Empresa no autorizada para este usuario.');
      }

      // const medicamentoCrear = await this.medicamento.create({
      //   data: {
      //     med_nombre: createMedicamentoDto.nombre,
      //     med_dosis: createMedicamentoDto.dosis,
      //     empresa_id: createMedicamentoDto.empresa_id,
      //     createdBy: user.id,
      //     tratamiento: {
      //       connect: {
      //         tra_id: createMedicamentoDto.tratamiento_id, // Debes tener este ID
      //       },
      //     },
      //   },
      // });

      return "";
    } catch (error) {
      this.logger.error('Error en creación de medicamento', error.stack || error.message);
      throw new InternalServerErrorException('No se pudo crear el medicamento');
    }
  }

  findAll() {
    return `This action returns all medicamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicamento`;
  }

  update(id: number, updateMedicamentoDto: UpdateMedicamentoDto) {
    return `This action updates a #${id} medicamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicamento`;
  }
}
