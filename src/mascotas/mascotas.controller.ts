import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';

@Controller()
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @MessagePattern({ cmd: 'crear_mascota' })
  create(@Payload() payload:{createMascotaDto: CreateMascotaDto; user: { id: number }}) {
    const {createMascotaDto,user} = payload;
    return this.mascotasService.create({
      ...createMascotaDto,
      createdBy: user.id
    },user);
  }

  @MessagePattern('findAllMascotas')
  findAll() {
    return this.mascotasService.findAll();
  }

  @MessagePattern('findOneMascota')
  findOne(@Payload() id: number) {
    return this.mascotasService.findOne(id);
  }

  @MessagePattern('updateMascota')
  update(@Payload() updateMascotaDto: UpdateMascotaDto) {
    return this.mascotasService.update(updateMascotaDto.id, updateMascotaDto);
  }

  @MessagePattern('removeMascota')
  remove(@Payload() id: number) {
    return this.mascotasService.remove(id);
  }
}
