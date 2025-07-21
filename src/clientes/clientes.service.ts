import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { privateDecrypt } from 'crypto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDto } from 'src/common';

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

  async findAll(adminId: number, empresaId: number, paginationDto: PaginationDto) {
    const { page = 1, limit = 50, search = '' } = paginationDto;
    const where: any = {
      empresa_id: empresaId,
      activo: true,
    };

    if (search) {
      where.OR = [
        { cli_nombre: { contains: search, mode: 'insensitive' } },
        { cli_identificacion: { contains: search, mode: 'insensitive' } },
        { cli_email: { contains: search, mode: 'insensitive' } },


      ];
    }

    try {
      const empresas = await this.client.send('empresas.obtener-empresas-por-admin', { admin_id: adminId }).toPromise();

      if (!empresas || empresas.length === 0) {
        return [];
      }

      const empresasIds = empresas.map((e) => e.emp_id);
      if (!empresasIds.includes(empresaId)) {
        throw new UnauthorizedException('No tiene acceso a esta empresa');
      }

      const clientes = await this.cliente.findMany({
        where,
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
  //inicia encontrar cliente por id
  async findOne(cli_id: number, userId: number) {
    const cliente = await this.cliente.findFirst({
      where: {
        cli_id
      }
    });
    if (!cliente) {
      throw new RpcException({
        message: `[gesveterinaria-ms]Propietario  con el # ${cli_id} no encontrado`
      })
    }
    return cliente;
  }
  //fin encontrar cliente por id
  //************************************************************************************** */
  //inicio actuializar cliente por id
  async update(cli_id: number, updateClienteDto: UpdateClienteDto, updatedBy: number, admin_id: number) {
    try {
      if (!cli_id) {
        console.error('❌ Error: CLI_ID es undefined. No se puede actualizar.');
        throw new BadRequestException('🚫 No se encontró el ID del cliente para actualizar.');
      }

      const existingCliente = await this.cliente.findUnique({ where: { cli_id } });
      if (!existingCliente) {
        throw new BadRequestException(`🚫 No se encontró ningun cliente con ID: ${cli_id}`);
      }

      console.log('📝 updateClienteDto recibido:', updateClienteDto);

      const { valido } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: existingCliente.empresa_id,
          admin_id,
        })
        .toPromise();

      if (!valido) {
        throw new ForbiddenException('No autorizado para modificar este cliente');
      }

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
  //fin actuializar cliente por id
  //************************************************************************************************************ */
  //ininio borrado logico
  async remove(cli_id: number, admin_id: number, updatedBy: number) {
    try {
      const cliente = await this.cliente.findUnique({
        where: { cli_id },
      });

      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${cli_id} no encontrado.`);
      }

      const { valido } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: cliente.empresa_id,
          admin_id,
        })
        .toPromise();

      if (!valido) {
        throw new ForbiddenException('No autorizado para eliminar este cliente.');
      }

      const clienteEliminado = await this.cliente.update({
        where: { cli_id },
        data: {
          activo: false,
          updatedBy,
        },
      });

      return {
        message: `Cliente con ID ${cli_id} eliminado lógicamente.`,
        cliente: clienteEliminado,
      };
    } catch (error) {
      console.error('❌ Error al eliminar cliente:', error);
      throw new RpcException({
        message: 'Error al eliminar cliente',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  //ininio borrado logico
  //*************************************************************************************************************** */
  async listarPorEmpresa(empresa_id: number, admin_id: number, paginationDto: PaginationDto) {
    const { page = 1, limit = 50, search = '' } = paginationDto;
    const where: any = {
      empresa_id: empresa_id,
      activo: true,
    };

    if (search) {
      where.OR = [
        { cli_nombre: { contains: search, mode: 'insensitive' } },
        { cli_identificacion: { contains: search, mode: 'insensitive' } },
        { cli_email: { contains: search, mode: 'insensitive' } },


      ];
    }
    // Validar que el admin está relacionado con la empresa
    const { valido, motivo } = await this.client
      .send('empresas.validar-empresa-admin', {
        empresa_id,
        admin_id,
      })
      .toPromise();

    if (!valido) {
      this.logger.warn(`Acceso denegado: ${motivo}`);
      throw new ForbiddenException('Empresa no autorizada para este usuario.');
    }

    // Si está autorizado, retornar los clientes
    return this.cliente.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });
  }

}
