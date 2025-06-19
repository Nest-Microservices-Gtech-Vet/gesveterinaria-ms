import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RazaService extends PrismaClient implements OnModuleInit {

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

  create(createRazaDto: CreateRazaDto) {
    return 'This action adds a new raza';
  }

  async findAll() {
    const razas = await this.raza.findMany()
    return razas;
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
