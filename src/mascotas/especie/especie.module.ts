import { Module } from '@nestjs/common';
import { EspecieService } from './especie.service';
import { EspecieController } from './especie.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [EspecieController],
  providers: [EspecieService],
  imports:[NatsModule]
})
export class EspecieModule {}
