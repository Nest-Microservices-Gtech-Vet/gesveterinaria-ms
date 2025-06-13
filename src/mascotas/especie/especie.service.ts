import { Injectable } from '@nestjs/common';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';

@Injectable()
export class EspecieService {
  create(createEspecieDto: CreateEspecieDto) {
    return 'This action adds a new especie';
  }

  findAll() {
    return `This action returns all especie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} especie`;
  }

  update(id: number, updateEspecieDto: UpdateEspecieDto) {
    return `This action updates a #${id} especie`;
  }

  remove(id: number) {
    return `This action removes a #${id} especie`;
  }
}
