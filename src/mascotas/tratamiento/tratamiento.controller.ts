import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TratamientoService } from './tratamiento.service';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';

@Controller()
export class TratamientoController {
  constructor(private readonly tratamientoService: TratamientoService) {}

  @MessagePattern('createTratamiento')
  create(@Payload() createTratamientoDto: CreateTratamientoDto) {
    return this.tratamientoService.create(createTratamientoDto);
  }

  @MessagePattern('findAllTratamiento')
  findAll() {
    return this.tratamientoService.findAll();
  }

  @MessagePattern('findOneTratamiento')
  findOne(@Payload() id: number) {
    return this.tratamientoService.findOne(id);
  }

  @MessagePattern('updateTratamiento')
  update(@Payload() updateTratamientoDto: UpdateTratamientoDto) {
    return this.tratamientoService.update(updateTratamientoDto.id, updateTratamientoDto);
  }

  @MessagePattern('removeTratamiento')
  remove(@Payload() id: number) {
    return this.tratamientoService.remove(id);
  }
}
