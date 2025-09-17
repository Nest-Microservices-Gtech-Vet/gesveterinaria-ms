import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { ConsultaActivaDto } from './dto/consulta-activa.dto';

@Controller()
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) { }
//aqui crear consultas
  @MessagePattern({ cmd: 'crear_consulta' })
  create(@Payload() payload: { createConsultaDto: CreateConsultaDto; user: { id: number } }) {
    return this.consultaService.create(payload.createConsultaDto, payload.user);
  }

  @MessagePattern({ cmd: 'consultaById' })
  async findOne(@Payload() payload: { id: number, user: { id: number } }) {

    return this.consultaService.findOneConsulta(payload.id, payload.user.id);
  }


  @MessagePattern({ cmd: 'consulta_update' })
  async updateConsulta(
    @Payload() payload: {
      id: number;
      updateConsultaDto: UpdateConsultaDto;
      updatedBy: number;
      user: { id: number };
    }) {
    const { id, updateConsultaDto, updatedBy, user } = payload
    return this.consultaService.update(id, updateConsultaDto, updatedBy, user.id);
  }



  @MessagePattern({ cmd: 'consulta.activa' })
  async handleConsultaActiva(
    @Payload() payload: { empresaId?: number | null; mascotaId?: number | null },
  ) {
    console.log('📩 Payload recibido en microservicio:', payload);
    return await this.consultaService.obtenerConsultaActiva(
      payload.empresaId ?? null,
      payload.mascotaId ?? null,
    );
  }







}


