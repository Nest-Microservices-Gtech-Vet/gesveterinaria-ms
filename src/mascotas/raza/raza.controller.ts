import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RazaService } from './raza.service';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';

@Controller()
export class RazaController {
  constructor(private readonly razaService: RazaService) {}

  @MessagePattern('createRaza')
  create(@Payload() createRazaDto: CreateRazaDto) {
    return this.razaService.create(createRazaDto);
  }

  @MessagePattern({ cmd: 'findAll_razas' })
  findAll(@Payload() _payload:any) {
    return this.razaService.findAll();
  }

  @MessagePattern('findOneRaza')
  findOne(@Payload() id: number) {
    return this.razaService.findOne(id);
  }

  @MessagePattern('updateRaza')
  update(@Payload() updateRazaDto: UpdateRazaDto) {
    return this.razaService.update(updateRazaDto.id, updateRazaDto);
  }

  @MessagePattern('removeRaza')
  remove(@Payload() id: number) {
    return this.razaService.remove(id);
  }
}
