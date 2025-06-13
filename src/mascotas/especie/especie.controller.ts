import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EspecieService } from './especie.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';

@Controller()
export class EspecieController {
  constructor(private readonly especieService: EspecieService) {}

  @MessagePattern('createEspecie')
  create(@Payload() createEspecieDto: CreateEspecieDto) {
    return this.especieService.create(createEspecieDto);
  }

  @MessagePattern('findAllEspecie')
  findAll() {
    return this.especieService.findAll();
  }

  @MessagePattern('findOneEspecie')
  findOne(@Payload() id: number) {
    return this.especieService.findOne(id);
  }

  @MessagePattern('updateEspecie')
  update(@Payload() updateEspecieDto: UpdateEspecieDto) {
    return this.especieService.update(updateEspecieDto.id, updateEspecieDto);
  }

  @MessagePattern('removeEspecie')
  remove(@Payload() id: number) {
    return this.especieService.remove(id);
  }
}
