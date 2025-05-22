import { BadRequestException, Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PropietariosService } from './propietarios.service';
import { CreatePropietarioDto } from './dto/create-propietario.dto';
import { UpdatePropietarioDto } from './dto/update-propietario.dto';

@Controller()
export class PropietariosController {
  constructor(private readonly propietariosService: PropietariosService) { }

  @MessagePattern({ cmd: 'crear_propietario' })
  async create(@Payload() payload: { createPropietarioDto: CreatePropietarioDto; user: { id: number } }) {
    const { createPropietarioDto, user } = payload;

    if (!user?.id) {
      throw new BadRequestException('El campo user.id es obligatorio');
    }

    return this.propietariosService.create({
      ...createPropietarioDto,
      createdBy:user.id
    }, user);
  }


    @MessagePattern('findAll_propietarios')
    findAll() {
      return this.propietariosService.findAll();
    }

    @MessagePattern('findPropietarioById')
    async findOne(@Payload('prop_id', ParseIntPipe) prop_id: number) {
      return this.propietariosService.findOne(prop_id);
    }


    @MessagePattern('updatePropietario')
    async update(@Payload() payload:any) {
      const {prop_id,updatedBy, updatePropietarioDto} = payload
      console.log(`EL PROPIETARIO ${payload}`)
      return this.propietariosService.update(prop_id, updatePropietarioDto, updatedBy);
    }

  //   @MessagePattern('removePropietario')
  //   remove(@Payload() id: number) {
  //     return this.propietariosService.remove(id);
  //   }
}
