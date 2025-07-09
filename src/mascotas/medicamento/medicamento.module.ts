import { Module } from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { MedicamentoController } from './medicamento.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [MedicamentoController],
  providers: [MedicamentoService],
  imports:[NatsModule],
})
export class MedicamentoModule {}
