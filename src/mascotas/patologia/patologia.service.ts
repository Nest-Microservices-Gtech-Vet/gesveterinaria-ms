import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreatePatologiaDto } from './dto/create-patologia.dto';
import { UpdatePatologiaDto } from './dto/update-patologia.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PatologiaService extends PrismaClient implements OnModuleInit {

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


  create(createPatologiaDto: CreatePatologiaDto) {
    return 'This action adds a new patologia';
  }

  async findAll() {
    const patologias = await this.patologia.findMany()
    return patologias;
  }

  findOne(id: number) {
    return `This action returns a #${id} patologia`;
  }

  update(id: number, updatePatologiaDto: UpdatePatologiaDto) {
    return `This action updates a #${id} patologia`;
  }

  remove(id: number) {
    return `This action removes a #${id} patologia`;
  }
}
