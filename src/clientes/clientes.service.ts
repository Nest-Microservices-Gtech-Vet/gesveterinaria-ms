import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { privateDecrypt } from 'crypto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService extends PrismaClient implements OnModuleInit {
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
  async create(createClienteDto: CreateClienteDto, user: { id: number }) {
    try {
      this.logger.log(`Validando empresa ${createClienteDto.empresa_id} para el admin ${user.id}`);

      const { valido, motivo } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: createClienteDto.empresa_id,
          admin_id: user.id,
        })
        .toPromise();

      if (!valido) {
        this.logger.warn(`Empresa no válida para el admin: ${motivo}`);
        throw new ForbiddenException('Empresa no autorizada para este usuario.');
      }

      const cliente = await this.cliente.create({
        data: {
          cli_identificacion: createClienteDto.cli_identificacion,
          cli_nombre: createClienteDto.cli_nombre,
          cli_apellido: createClienteDto.cli_apellido,
          cli_email: createClienteDto.cli_email,
          cli_celular: createClienteDto.cli_celular,
          cli_direccion: createClienteDto.cli_direccion,
          cli_observaciones: createClienteDto.cli_observaciones,
          empresa_id: createClienteDto.empresa_id,
          activo: createClienteDto.activo ?? true,
          createdBy: user.id,
        },
      });

      return cliente;
    } catch (error) {
      this.logger.error('Error en creación de cliente', error.stack || error.message);
      throw new InternalServerErrorException('No se pudo crear el cliente');
    }
  }
  //fin crear paciente
  //************************************************************************************** */
  //inicia obtener clientes

  async findAll(adminId: number) {
    try {
      const empresas = await this.client.send('empresas.obtener-empresas-por-admin', { admin_id: adminId }).toPromise();

      if (!empresas || empresas.length === 0) {
        return [];
      }

      const empresasIds = empresas.map((e) => e.emp_id);

      const clientes = await this.cliente.findMany({
        where: {
          empresa_id: { in: empresasIds }
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      return clientes;
    } catch (error) {
      this.logger.error('Error al listar clientes por admin', error.stack || error.message);
      throw new InternalServerErrorException('No se pudo obtener la lista de clientes');
    }

  }
  //fin obtener clientes
  //************************************************************************************** */

  async findOne(cli_id: number) {
    const propietario = await this.cliente.findFirst({
      where: {
        cli_id
      }
    });
    if (!propietario) {
      throw new RpcException({
        message: `[gesveterinaria-ms]Propietario  con el # ${cli_id} no encontrado`
      })
    }
    return propietario;
  }

  async update(cli_id: number, updateClienteDto: UpdateClienteDto, updatedBy: number) {
    try {
      if (!cli_id) {
        console.error('❌ Error: CLI_ID es undefined. No se puede actualizar.');
        throw new BadRequestException('🚫 No se encontró el ID del cliente para actualizar.');
      }

      const existingCliente = await this.cliente.findUnique({ where: { cli_id } });
      if (!existingCliente) {
        throw new BadRequestException(`🚫 No se encontró ninguna empresa con ID: ${cli_id}`);
      }

      console.log('📝 updateClienteDto recibido:', updateClienteDto);

      const clienteUpdated = await this.cliente.update({
        where: { cli_id },
        data: {
          ...updateClienteDto,
          updatedBy,
        }
      });

      console.log(`✅ cliente actualizado correctamente: ${updateClienteDto.cli_nombre}`);
      return clienteUpdated;
    } catch (error) {
      console.error('❌ Error al actualizar cliente:', error);
      throw new RpcException({
        message: 'Error al actualizar la cliente',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async remove(cli_id: number, updatedBy: number) {
    await this.findOne(cli_id);
    const propietariodeleted = await this.cliente.update({
      where: { cli_id },
      data: {
        activo: false,
        updatedBy,
      }
    });
    return propietariodeleted;
  }
}
