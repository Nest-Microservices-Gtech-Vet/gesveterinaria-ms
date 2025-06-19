import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateEspecieRazaPatologiaDto } from './dto/create-especie-raza-patologia.dto';
import { UpdateEspecieRazaPatologiaDto } from './dto/update-especie-raza-patologia.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EspecieRazaPatologiaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('GestVeterinaria-Service-Mascotas');
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {
    super();
  }
  onModuleInit() {
    this.$connect
    this.logger.log('gesVeterinania Mascotas conectado')
  }

  create(createEspecieRazaPatologiaDto: CreateEspecieRazaPatologiaDto) {
    return 'This action adds a new especieRazaPatologia';
  }

  async findAll() {
    const especieRazaPatologia = await this.especieRazaPatologia.findMany();
    return especieRazaPatologia;
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
