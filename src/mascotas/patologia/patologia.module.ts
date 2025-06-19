import { Module } from '@nestjs/common';
import { PatologiaService } from './patologia.service';
import { PatologiaController } from './patologia.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PatologiaController],
  providers: [PatologiaService],
  imports: [NatsModule]
})
export class PatologiaModule {}
