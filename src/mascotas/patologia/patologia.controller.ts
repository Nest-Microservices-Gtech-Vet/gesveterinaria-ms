import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PatologiaService } from './patologia.service';
import { CreatePatologiaDto } from './dto/create-patologia.dto';
import { UpdatePatologiaDto } from './dto/update-patologia.dto';

@Controller()
export class PatologiaController {
  constructor(private readonly patologiaService: PatologiaService) {}

  @MessagePattern('createPatologia')
  create(@Payload() createPatologiaDto: CreatePatologiaDto) {
    return this.patologiaService.create(createPatologiaDto);
  }

  @MessagePattern('findAllPatologia')
  findAll() {
    return this.patologiaService.findAll();
  }

  @MessagePattern('findOnePatologia')
  findOne(@Payload() id: number) {
    return this.patologiaService.findOne(id);
  }

  @MessagePattern('updatePatologia')
  update(@Payload() updatePatologiaDto: UpdatePatologiaDto) {
    return this.patologiaService.update(updatePatologiaDto.id, updatePatologiaDto);
  }

  @MessagePattern('removePatologia')
  remove(@Payload() id: number) {
    return this.patologiaService.remove(id);
  }
}
