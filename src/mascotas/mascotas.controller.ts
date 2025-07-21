import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { PaginationDto } from 'src/common';



@Controller()
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) { }

  @MessagePattern({ cmd: 'crear_mascota' })
  create(@Payload() payload: { createMascotaDto: CreateMascotaDto; user: { id: number } }) {
    const { createMascotaDto, user } = payload;
    return this.mascotasService.create({
      ...createMascotaDto,
      createdBy: user.id
    }, user);
  }

  @MessagePattern({ cmd: 'findAll_mascotas' })
  findAll(@Payload() payload: { adminId: number, empresaId: number , paginationDto: PaginationDto}) {
    const { adminId, empresaId ,paginationDto} = payload;
    return this.mascotasService.findAll(adminId, empresaId,paginationDto);
  }


  @MessagePattern({ cmd: 'mascotaById' })
  findOne(@Payload() payload: { id: number, user: { id: number } }) {
    return this.mascotasService.findOne(payload.id, payload.user.id);
  }

  @MessagePattern({ cmd: 'mascota_update' })
  async update(
    @Payload() payload: {
      mas_id: number;
      updateMascotaDto: UpdateMascotaDto;
      updatedBy: number;
      user: { id: number };
      files?: Express.Multer.File[];
    }
  ) {
    
    const { mas_id, updateMascotaDto, updatedBy, user, files } = payload;
    console.log('Archivos recibidos en microservicio:', files);


    const foto = files?.find((file) => file.fieldname === 'mas_foto');
     console.log('📸 Foto recibida en microservicio:', foto?.filename);
    if (foto) {
      updateMascotaDto.mas_foto = foto.filename;
    }

    return await this.mascotasService.update(mas_id, updateMascotaDto, updatedBy, user.id);
  }


  @MessagePattern({ cmd: 'mascota_delete' })
  async remove(@Payload() payload: {
    mas_id: number;
    user: { id: number };
    updatedBy: number;
  }) {
    const { mas_id, user, updatedBy } = payload
    console.log(`El propietario ${payload} a sido eliminado`)
    return this.mascotasService.remove(mas_id, user.id, updatedBy)
  }
}
