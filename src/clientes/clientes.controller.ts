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
  findAll(@Payload() payload: { adminId: number, empresaId: number }) {
    const { adminId ,empresaId} = payload;
    return this.clientesService.findAll(adminId,empresaId);
  }
  //fin obtener clientes
  //************************************************************************************** */
  //inicia obtener clientes por id
  @MessagePattern({ cmd: 'findOne_cliente'})
  async findOne(@Payload() payload: { cli_id: number, user: { id: number }  }) {

    return this.clientesService.findOne(payload.cli_id, payload.user.id);
  }
  //fin obtener clientes por id
  //************************************************************************************** */
//INICIO ACTUALIZAR CLIENTE
  @MessagePattern({ cmd: 'cliente_update' })
  async update(
    @Payload() payload: {
      cli_id:number;
      updateClienteDto: UpdateClienteDto;
      updatedBy: number;
      user: { id: number };}) {
    const { cli_id, updateClienteDto, updatedBy, user  } = payload
    console.log(`EL CLIENTE ${payload}`)
    return this.clientesService.update(cli_id, updateClienteDto, updatedBy, user.id);
  }
  //FIN ACTUALIZAR CLIENTE
//************************************************************************************** */
//inicio borrado logico
  @MessagePattern({ cmd: 'cliente_delete' })
  async remove(@Payload() payload: {
    cli_id: number;
    user:{id:number};
    updatedBy:number;
  }) {
    const { cli_id,user, updatedBy } = payload
    console.log(`El propietario ${payload} a sido eliminado`)
    return this.clientesService.remove(cli_id,user.id, updatedBy);
  }
// fin borrado logico 

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
