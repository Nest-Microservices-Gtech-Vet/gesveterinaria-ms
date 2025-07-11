import { Module } from '@nestjs/common';
import { ExamenesService } from './examenes.service';
import { ExamenesController } from './examenes.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ExamenesController],
  providers: [ExamenesService],
  imports:[NatsModule]
})
export class ExamenesModule {}
