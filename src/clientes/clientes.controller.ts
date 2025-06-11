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
  findAll(@Payload() payload:{adminId: number}) {
    const {  adminId } = payload;
    return this.clientesService.findAll(adminId);
  }
  //fin obtener clientes
  //************************************************************************************** */

  @MessagePattern('findPropietarioById')
  async findOne(@Payload('prop_id', ParseIntPipe) cli_id: number) {
    return this.clientesService.findOne(cli_id);
  }


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
}
