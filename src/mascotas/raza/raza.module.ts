import { Module } from '@nestjs/common';
import { RazaService } from './raza.service';
import { RazaController } from './raza.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [RazaController],
  providers: [RazaService],
  imports:[NatsModule]
})
export class RazaModule {}
