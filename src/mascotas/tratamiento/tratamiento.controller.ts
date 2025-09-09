import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TratamientoService } from './tratamiento.service';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { UpdateMedicamentoDto } from '../medicamento/dto/update-medicamento.dto';

@Controller()
export class TratamientoController {
  constructor(private readonly tratamientoService: TratamientoService) { }

  @MessagePattern({ cmd: 'crear_tratamiento' })
  create(@Payload() payload: { createTratamientoDto: CreateTratamientoDto, user: { id: number } }) {
    return this.tratamientoService.createTratamiento(payload.createTratamientoDto, payload.user);
  }

  @MessagePattern('findAllTratamiento')
  findAll() {
    return this.tratamientoService.findAll();
  }

  @MessagePattern({ cmd: 'obtener_tratamiento_por_consulta' })
  async tratamientoByConsulta(@Payload() payload: { consultaId: number, user: { id: number } }) {
    return this.tratamientoService.tratamientoByConsulta(payload.consultaId, payload.user.id)
  }



  @MessagePattern({ cmd: 'obtener_tratamiento' })
  async findOne(@Payload() payload: { id: number, user: { id: number } }) {
    return this.tratamientoService.findOneTratamiento(payload.id, payload.user.id);
  }

  @MessagePattern({ cmd: 'medi_update' })
  updateMedi(@Payload() payload: {
    med_id: number;
    updateMedicamentoDto: UpdateMedicamentoDto;
    updatedBy: number;
    user: { id: number };
  }) {
    const { med_id, updateMedicamentoDto, updatedBy, user } = payload;
    const { empresa_id } = updateMedicamentoDto;
    console.log(`EL medicamneto ${payload}`)
    return this.tratamientoService.updateMedicamento(med_id, updateMedicamentoDto, updatedBy, user.id, empresa_id);
  }

  @MessagePattern({ cmd: 'update_tratamiento' })
  update(@Payload() payload: {
    tra_id: number;
    updateTratamientoDto: UpdateTratamientoDto;
    updatedBy: number;
    user: { id: number };
  }) {
    const { tra_id, updateTratamientoDto, updatedBy, user } = payload;
    const { empresa_id } = updateTratamientoDto;

    return this.tratamientoService.updateTratamiento(
      tra_id,
      updateTratamientoDto,
      updatedBy,
      user.id,
      empresa_id
    );
  }



  @MessagePattern('removeTratamiento')
  remove(@Payload() id: number) {
    return this.tratamientoService.remove(id);
  }
}
