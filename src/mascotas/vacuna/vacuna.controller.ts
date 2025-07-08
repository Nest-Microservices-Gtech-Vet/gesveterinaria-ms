import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VacunaService } from './vacuna.service';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';

@Controller()
export class VacunaController {
  constructor(private readonly vacunaService: VacunaService) { }

  @MessagePattern({ cmd: 'vacunas.crear-con-fotos' })
  async create(
    @Payload()
    payload: {
      createVacunaDto: CreateVacunaDto;
      user: { id: number };
      fotos?: { url: string; descripcion?: string }[];
    }
  ) {
    const { createVacunaDto, user, fotos } = payload;
    return this.vacunaService.createVacuna(createVacunaDto, user, fotos);
  }


  // @MessagePattern({ cmd: 'vacuna.subir-fotos' })
  // async subirFotos(@Payload() data: { vacId: number; fotos: { url: string; descripcion?: string }[] }) {
  //   const { vacId, fotos } = data;
  //   if (!vacId) throw new NotFoundException('ID de vacuna no proporcionado');
  //   return this.vacunaService.guardarFotosVacuna(vacId, fotos);
  // }



}
