import { Module } from '@nestjs/common';
import { EspecieRazaPatologiaService } from './especie-raza-patologia.service';
import { EspecieRazaPatologiaController } from './especie-raza-patologia.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [EspecieRazaPatologiaController],
  providers: [EspecieRazaPatologiaService],
  imports:[NatsModule]
})
export class EspecieRazaPatologiaModule {}
