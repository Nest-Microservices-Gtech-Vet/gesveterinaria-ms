import { BadRequestException, ForbiddenException, Inject, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { UpdateMedicamentoDto } from '../medicamento/dto/update-medicamento.dto';

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

  async tratamientoByConsulta(con_id: number, userId: number) {
    const tratamientos = await this.tratamiento.findMany({
      where: {
        consulta_id: con_id
      },
      include: {
        medicamentos: true,
        consulta: true
      }
    });

    if (!tratamientos || tratamientos.length === 0) {
      throw new NotFoundException('No se encontró tratamiento para esta consulta');
    }

    for (const tratamiento of tratamientos) {
      const empresaId = tratamiento.consulta.empresa_id;

      const { valido, motivo } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: empresaId,
          admin_id: userId,
        })
        .toPromise();

      if (!valido) {
        throw new ForbiddenException(motivo || `No autorizado para tratamiento de empresa ${empresaId}`);
      }
    }

    return tratamientos;
  }

  async findOneTratamiento(tratamiento_id: number, userId: number) {
    const tratamiento = await this.tratamiento.findUnique({
      where: { tra_id: tratamiento_id },
      include: {
        medicamentos: true,
        consulta: true,
      }
    })

    if (!tratamiento) throw new NotFoundException('Tratamiento no encontrado');

    return tratamiento;
  }

  update(id: number, updateTratamientoDto: UpdateTratamientoDto) {
    return `This action updates a #${id} tratamiento`;
  }




  async updateMedicamento(med_id: number, updateMedicamentoDto: UpdateMedicamentoDto, updatedBy: number, admin_id: number, empresa_id?: number) {
    try {
      if (!med_id) {
        throw new BadRequestException('🚫 No se encontró el ID del medicamento para actualizar.');
      }

      if (!empresa_id) {
        throw new BadRequestException('🚫 No se encontró la empresa asociada al medicamento.');
      }

      console.log('📝 updateClienteDto recibido:', updateMedicamentoDto);

      const { valido } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id,
          admin_id,
        })
        .toPromise();

      if (!valido) {
        throw new ForbiddenException('No autorizado para modificar este medicamento');
      }

      return await this.medicamento.update({
        where: { med_id },
        data: {
          ...updateMedicamentoDto,
          updatedBy,
        },
      });
    } catch (error) {

    }
  }

 async updateTratamiento(
  tra_id: number,
  dto: UpdateTratamientoDto,
  updatedBy: number,
  admin_id: number,
  empresa_id?: number
) {
  if (!tra_id) throw new BadRequestException('No se encontró el ID del tratamiento.');
  if (!empresa_id) throw new BadRequestException('No se encontró la empresa asociada.');

  // Validación empresa/admin
  const { valido } = await this.client
    .send('empresas.validar-empresa-admin', { empresa_id, admin_id })
    .toPromise();

  if (!valido) throw new ForbiddenException('Empresa no autorizada');

  // Actualizamos el tratamiento
  const tratamientoActualizado = await this.tratamiento.update({
    where: { tra_id },
    data: {
      consulta_id: dto.consulta_id,
      mascota_id: dto.mascota_id,
      updatedBy,
    },
  });

  // Actualizamos medicamentos (opcional)
  if (dto.medicamentos?.length) {
    // Eliminar anteriores y crear nuevos
    await this.medicamento.deleteMany({ where: { tratamiento_id: tra_id } });

    await this.medicamento.createMany({
      data: dto.medicamentos.map((m) => ({
        med_nombre: m.nombre,
        med_dosis: m.dosis,
        empresa_id,
        createdBy: updatedBy,
        tratamiento_id: tra_id,
      })),
    });
  }

  return {
    ...tratamientoActualizado,
    medicamentos: dto.medicamentos || [],
  };
}




  remove(id: number) {
    return `This action removes a #${id} tratamiento`;
  }
}
