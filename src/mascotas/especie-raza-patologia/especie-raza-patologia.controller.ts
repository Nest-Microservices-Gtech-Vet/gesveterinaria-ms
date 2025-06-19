import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EspecieRazaPatologiaService } from './especie-raza-patologia.service';
import { CreateEspecieRazaPatologiaDto } from './dto/create-especie-raza-patologia.dto';
import { UpdateEspecieRazaPatologiaDto } from './dto/update-especie-raza-patologia.dto';

@Controller()
export class EspecieRazaPatologiaController {
  constructor(private readonly especieRazaPatologiaService: EspecieRazaPatologiaService) {}

  @MessagePattern('createEspecieRazaPatologia')
  create(@Payload() createEspecieRazaPatologiaDto: CreateEspecieRazaPatologiaDto) {
    return this.especieRazaPatologiaService.create(createEspecieRazaPatologiaDto);
  }

  @MessagePattern({ cmd: 'findAll_especieRazaPat' })
  findAll(@Payload() _payload:any) {
    return this.especieRazaPatologiaService.findAll();
  }

  @MessagePattern('findOneEspecieRazaPatologia')
  findOne(@Payload() id: number) {
    return this.especieRazaPatologiaService.findOne(id);
  }

  @MessagePattern('updateEspecieRazaPatologia')
  update(@Payload() updateEspecieRazaPatologiaDto: UpdateEspecieRazaPatologiaDto) {
    return this.especieRazaPatologiaService.update(updateEspecieRazaPatologiaDto.id, updateEspecieRazaPatologiaDto);
  }

  @MessagePattern('removeEspecieRazaPatologia')
  remove(@Payload() id: number) {
    return this.especieRazaPatologiaService.remove(id);
  }
}
