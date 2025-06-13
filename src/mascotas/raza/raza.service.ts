import { Injectable } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';

@Injectable()
export class RazaService {
  create(createRazaDto: CreateRazaDto) {
    return 'This action adds a new raza';
  }

  findAll() {
    return `This action returns all raza`;
  }

  findOne(id: number) {
    return `This action returns a #${id} raza`;
  }

  update(id: number, updateRazaDto: UpdateRazaDto) {
    return `This action updates a #${id} raza`;
  }

  remove(id: number) {
    return `This action removes a #${id} raza`;
  }
}
