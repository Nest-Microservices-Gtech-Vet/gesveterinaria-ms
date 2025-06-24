import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ConsultaController],
  providers: [ConsultaService],
  imports:[NatsModule]
})
export class ConsultaModule {}
