import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Controller()
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @MessagePattern({ cmd: 'crear_consulta' })
  create( @Payload() payload: { createConsultaDto: CreateConsultaDto; user: { id: number } }) {
    return this.consultaService.create(payload.createConsultaDto,payload.user);
  }

  @MessagePattern({ cmd: 'consultaById' })
  async findOne(@Payload() payload: { id: number, user: { id: number }  }) {

    return this.consultaService.findOneConsulta(payload.id, payload.user.id);
  }


  @MessagePattern({ cmd: 'consulta_update' })
  async updateConsulta(
    @Payload() payload:{
      id:number;
      updateConsultaDto: UpdateConsultaDto;
      updatedBy:number;
      user: { id: number};
    }) {
    const{id,updateConsultaDto,updatedBy,user} = payload
    return this.consultaService.update(id,updateConsultaDto,updatedBy,user.id);
  }

  @MessagePattern('removeConsulta')
  remove(@Payload() id: number) {
    return this.consultaService.remove(id);
  }
}
