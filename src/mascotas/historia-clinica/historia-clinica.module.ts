import { Module } from '@nestjs/common';
import { HistoriaClinicaService } from './historia-clinica.service';
import { HistoriaClinicaController } from './historia-clinica.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [HistoriaClinicaController],
  providers: [HistoriaClinicaService],
  imports:[NatsModule]
})
export class HistoriaClinicaModule {}
