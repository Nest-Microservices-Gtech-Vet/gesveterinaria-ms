import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicamentoService } from './medicamento.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Controller()
export class MedicamentoController {
  constructor(private readonly medicamentoService: MedicamentoService) {}

  @MessagePattern('createMedicamento')
  create(@Payload() createMedicamentoDto: CreateMedicamentoDto) {
    return this.medicamentoService.create(createMedicamentoDto);
  }

  @MessagePattern('findAllMedicamento')
  findAll() {
    return this.medicamentoService.findAll();
  }

  @MessagePattern('findOneMedicamento')
  findOne(@Payload() id: number) {
    return this.medicamentoService.findOne(id);
  }

  @MessagePattern('updateMedicamento')
  update(@Payload() updateMedicamentoDto: UpdateMedicamentoDto) {
    return this.medicamentoService.update(updateMedicamentoDto.id, updateMedicamentoDto);
  }

  @MessagePattern('removeMedicamento')
  remove(@Payload() id: number) {
    return this.medicamentoService.remove(id);
  }
}
