import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EspecieService extends PrismaClient implements OnModuleInit {
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
  
  
  create(createEspecieDto: CreateEspecieDto) {
    return 'This action adds a new especie';
  }

  async findAll() {
    const especies = await this.especie.findMany()
    return especies;
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
