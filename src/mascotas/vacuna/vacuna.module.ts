import { Module } from '@nestjs/common';
import { VacunaService } from './vacuna.service';
import { VacunaController } from './vacuna.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [VacunaController],
  providers: [VacunaService],
  imports: [NatsModule]
})
export class VacunaModule {}
