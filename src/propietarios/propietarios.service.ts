import { BadRequestException, HttpStatus, Inject, Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { CreatePropietarioDto } from './dto/create-propietario.dto';
import { UpdatePropietarioDto } from './dto/update-propietario.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { privateDecrypt } from 'crypto';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class PropietariosService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('GestVeterinaria-Service')

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {
    super();
  }

  onModuleInit() {
    this.$connect
    this.logger.log('gesVeterinania conectado')
  }

  //inicio crear paciente
  async create(createPropietarioDto: CreatePropietarioDto, user: { id: number }) {
    const { empresa_id } = createPropietarioDto;
    const validacion = await this.client.send('empresas.validar-empresa-admin', {
      empresa_id: createPropietarioDto.empresa_id,
      admin_id: user.id, // <- este es el admin autenticado
    }).toPromise();

    if (!validacion.valido) {
      throw new UnauthorizedException(
        validacion.motivo === 'NO_EXISTE'
          ? 'La empresa no existe'
          : 'No tiene permiso para esta empresa'
      );
    }


    return await this.propietario.create({
      data: {
        prop_identificacion: createPropietarioDto.prop_identificacion,
        prop_nombre: createPropietarioDto.prop_nombre,
        prop_apellido: createPropietarioDto.prop_apellido,
        prop_email: createPropietarioDto.prop_email,
        prop_celular: createPropietarioDto.prop_celular,
        prop_direccion: createPropietarioDto.prop_direccion,
        prop_observaciones: createPropietarioDto.prop_observaciones,
        empresa_id,
        activo: createPropietarioDto.activo,
        createdBy: user.id,
      }
    })
  }
  //fin crear paciente

  findAll() {
    return this.propietario.findMany({})

  }

  async findOne(prop_id: number) {
    const propietario = await this.propietario.findFirst({
      where: {
        prop_id
      }
    });
    if (!propietario) {
      throw new RpcException({
        message: `[gesveterinaria-ms]Propietario  con el # ${prop_id} no encontrado`
      })
    }
    return propietario;
  }

  async update(prop_id: number, updatePropietarioDto: UpdatePropietarioDto, updatedBy: number) {
    try {
      if (!prop_id) {
        console.error('❌ Error: PROP_ID es undefined. No se puede actualizar.');
        throw new BadRequestException('🚫 No se encontró el ID del propietario para actualizar.');
      }

      const existingPropietario = await this.propietario.findUnique({ where: { prop_id } });
      if (!existingPropietario) {
        throw new BadRequestException(`🚫 No se encontró ninguna empresa con ID: ${prop_id}`);
      }

      console.log('📝 updatePropietarioDto recibido:', updatePropietarioDto);

      const propietarioUpdated = await this.propietario.update({
        where: { prop_id },
        data: {
          ...updatePropietarioDto,
          updatedBy,
        }
      });

      console.log(`✅ propietario actualizado correctamente: ${updatePropietarioDto.prop_nombre}`);
      return propietarioUpdated;
    } catch (error) {
      console.error('❌ Error al actualizar propietario:', error);
      throw new RpcException({
        message: 'Error al actualizar la propietario',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} propietario`;
  }
}
