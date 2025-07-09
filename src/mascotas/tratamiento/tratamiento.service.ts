import { ForbiddenException, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TratamientoService extends PrismaClient implements OnModuleInit {
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


  async createTratamiento(dto: CreateTratamientoDto, user: { id: number }) {
    const { valido } = await this.client.send('empresas.validar-empresa-admin', {
      empresa_id: dto.empresa_id,
      admin_id: user.id,
    }).toPromise();

    if (!valido) throw new ForbiddenException('Empresa no autorizada');

    // Primero creamos el tratamiento
    const tratamientoCreado = await this.tratamiento.create({
      data: {
        consulta_id: dto.consulta_id,
        mascota_id: dto.mascota_id,
        empresa_id: dto.empresa_id,
        createdBy: user.id,
      },
    });


    // Ahora insertamos medicamentos con el tratamiento_id correcto
    await this.medicamento.createMany({
      data: dto.medicamentos.map((m) => ({
        med_nombre: m.nombre,
        med_dosis: m.dosis,
        empresa_id: dto.empresa_id,
        createdBy: user.id,
        tratamiento_id: tratamientoCreado.tra_id, // ✅ Aquí lo asignas tú
      })),
    });

    return {
      ...tratamientoCreado,
      medicamentos: dto.medicamentos,
    };
  }


  findAll() {
    return `This action returns all tratamiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tratamiento`;
  }

  update(id: number, updateTratamientoDto: UpdateTratamientoDto) {
    return `This action updates a #${id} tratamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tratamiento`;
  }
}
