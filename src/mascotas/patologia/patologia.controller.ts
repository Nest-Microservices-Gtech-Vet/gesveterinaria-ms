import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PatologiaService } from './patologia.service';
import { CreatePatologiaDto } from './dto/create-patologia.dto';
import { UpdatePatologiaDto } from './dto/update-patologia.dto';

@Controller()
export class PatologiaController {
  constructor(private readonly patologiaService: PatologiaService) { }

  @MessagePattern('createPatologia')
  create(@Payload() createPatologiaDto: CreatePatologiaDto) {
    return this.patologiaService.create(createPatologiaDto);
  }

  @MessagePattern({ cmd: 'findAll_patologias' })
  findAll(@Payload() _payload: any) {
    return this.patologiaService.findAll();
  }

  @MessagePattern({ cmd: 'patologiaById' })
  findOne(@Payload() payload: { id: number, user: { id: number } }) {
    return this.patologiaService.findOne(payload.id, payload.user.id);
  }

  // @MessagePattern({ cmd: 'findByEspecieRaza' })
  // findByEspecieRaza(@Payload() payload: { especieId: any, razaId: any }) {
  //   const especieId = Number(payload.especieId);
  //   const razaId = Number(payload.razaId);
  //   return this.patologiaService.getByEspecieRaza(especieId, razaId)
  // }

  @MessagePattern('updatePatologia')
  update(@Payload() updatePatologiaDto: UpdatePatologiaDto) {
    return this.patologiaService.update(updatePatologiaDto.id, updatePatologiaDto);
  }

  @MessagePattern('removePatologia')
  remove(@Payload() id: number) {
    return this.patologiaService.remove(id);
  }
}
