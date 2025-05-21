import { BadRequestException, Controller } from '@nestjs/common';
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


  //   @MessagePattern('findAll_Propietarios')
  //   findAll() {
  //     return this.propietariosService.findAll();
  //   }

  //   @MessagePattern('findOnePropietario')
  //   findOne(@Payload() id: number) {
  //     return this.propietariosService.findOne(id);
  //   }

  //   @MessagePattern('updatePropietario')
  //   update(@Payload() updatePropietarioDto: UpdatePropietarioDto) {
  //     return this.propietariosService.update(updatePropietarioDto.id, updatePropietarioDto);
  //   }

  //   @MessagePattern('removePropietario')
  //   remove(@Payload() id: number) {
  //     return this.propietariosService.remove(id);
  //   }
}
