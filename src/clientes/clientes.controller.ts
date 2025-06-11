import { BadRequestException, Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller()
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @MessagePattern({ cmd: 'crear_cliente' })
  async create(@Payload() payload: { createClienteDto: CreateClienteDto; user: { id: number } }) {
    const { createClienteDto, user } = payload;

    if (!user?.id) {
      throw new BadRequestException('El campo user.id es obligatorio');
    }

    return this.clientesService.create({
      ...createClienteDto,
      createdBy: user.id
    }, user);
  }

  //inicia obtener clientes
  @MessagePattern({ cmd: 'findAll_clientes' })
  findAll(@Payload() payload: { adminId: number }) {
    const { adminId } = payload;
    return this.clientesService.findAll(adminId);
  }
  //fin obtener clientes
  //************************************************************************************** */
  //inicia obtener clientes por id
  // @MessagePattern('findClienteById')
  // async findOne(@Payload('prop_id', ParseIntPipe) payload: { cli_id: number, adminId: number }) {
  //   const { adminId } = payload
  //   return this.clientesService.findOne(cli_id);
  // }
  //fin obtener clientes por id

  @MessagePattern('updateCliente')
  async update(@Payload() payload: any) {
    const { cli_id, updatedBy, updateClienteDto } = payload
    console.log(`EL CLIENTE ${payload}`)
    return this.clientesService.update(cli_id, updateClienteDto, updatedBy);
  }

  @MessagePattern('removePropietario')
  remove(@Payload() payload: any) {
    const { cli_id, updatedBy } = payload
    console.log(`El propietario ${payload} a sido eliminado`)
    return this.clientesService.remove(cli_id, updatedBy);
  }


  //**************************************************************************************** */
  // src/clientes/clientes.controller.ts (en gesveterinaria-ms)
  @MessagePattern({ cmd: 'clientes_por_empresa' })
  async listarClientesPorEmpresa(
    @Payload() payload: { empresa_id: number; user: { id: number } }
  ) {
    const { empresa_id, user } = payload;

    if (!user?.id) {
      throw new BadRequestException('El campo user.id es obligatorio');
    }

    return this.clientesService.listarPorEmpresa(empresa_id, user.id);
  }

}
