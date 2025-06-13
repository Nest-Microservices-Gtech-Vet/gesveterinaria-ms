import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Controller()
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @MessagePattern('createConsulta')
  create(@Payload() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.create(createConsultaDto);
  }

  @MessagePattern('findAllConsulta')
  findAll() {
    return this.consultaService.findAll();
  }

  @MessagePattern('findOneConsulta')
  findOne(@Payload() id: number) {
    return this.consultaService.findOne(id);
  }

  @MessagePattern('updateConsulta')
  update(@Payload() updateConsultaDto: UpdateConsultaDto) {
    return this.consultaService.update(updateConsultaDto.id, updateConsultaDto);
  }

  @MessagePattern('removeConsulta')
  remove(@Payload() id: number) {
    return this.consultaService.remove(id);
  }
}
