import { Injectable } from '@nestjs/common';
import { CreateEspecieRazaPatologiaDto } from './dto/create-especie-raza-patologia.dto';
import { UpdateEspecieRazaPatologiaDto } from './dto/update-especie-raza-patologia.dto';

@Injectable()
export class EspecieRazaPatologiaService {
  create(createEspecieRazaPatologiaDto: CreateEspecieRazaPatologiaDto) {
    return 'This action adds a new especieRazaPatologia';
  }

  findAll() {
    return `This action returns all especieRazaPatologia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} especieRazaPatologia`;
  }

  update(id: number, updateEspecieRazaPatologiaDto: UpdateEspecieRazaPatologiaDto) {
    return `This action updates a #${id} especieRazaPatologia`;
  }

  remove(id: number) {
    return `This action removes a #${id} especieRazaPatologia`;
  }
}
