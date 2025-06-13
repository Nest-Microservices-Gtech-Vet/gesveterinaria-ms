import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VacunaService } from './vacuna.service';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';

@Controller()
export class VacunaController {
  constructor(private readonly vacunaService: VacunaService) {}

  @MessagePattern('createVacuna')
  create(@Payload() createVacunaDto: CreateVacunaDto) {
    return this.vacunaService.create(createVacunaDto);
  }

  @MessagePattern('findAllVacuna')
  findAll() {
    return this.vacunaService.findAll();
  }

  @MessagePattern('findOneVacuna')
  findOne(@Payload() id: number) {
    return this.vacunaService.findOne(id);
  }

  @MessagePattern('updateVacuna')
  update(@Payload() updateVacunaDto: UpdateVacunaDto) {
    return this.vacunaService.update(updateVacunaDto.id, updateVacunaDto);
  }

  @MessagePattern('removeVacuna')
  remove(@Payload() id: number) {
    return this.vacunaService.remove(id);
  }
}
