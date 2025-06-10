import { Module } from '@nestjs/common';

import { NatsModule } from 'src/transports/nats.module';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [
    NatsModule
  ]
})
export class ClientesModule { }
