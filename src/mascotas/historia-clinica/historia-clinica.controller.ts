import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HistoriaClinicaService } from './historia-clinica.service';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';

@Controller()
export class HistoriaClinicaController {
  constructor(private readonly historiaClinicaService: HistoriaClinicaService) {}

  @MessagePattern({ cmd: 'crear_historiaClinica' })
  create(@Payload() payload: {createHistoriaClinicaDto: CreateHistoriaClinicaDto;user: { id: number } }) {
    const { createHistoriaClinicaDto,user} = payload;
    return this.historiaClinicaService.create({
      ...createHistoriaClinicaDto,
      createdBy: user.id,
    }, user);
  }

  @MessagePattern('findAllHistoriaClinica')
  findAll() {
    return this.historiaClinicaService.findAll();
  }

  @MessagePattern('findOneHistoriaClinica')
  findOne(@Payload() id: number) {
    return this.historiaClinicaService.findOne(id);
  }

  @MessagePattern('updateHistoriaClinica')
  update(@Payload() updateHistoriaClinicaDto: UpdateHistoriaClinicaDto) {
    return this.historiaClinicaService.update(updateHistoriaClinicaDto.id, updateHistoriaClinicaDto);
  }

  @MessagePattern('removeHistoriaClinica')
  remove(@Payload() id: number) {
    return this.historiaClinicaService.remove(id);
  }
}
