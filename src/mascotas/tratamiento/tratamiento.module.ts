import { Module } from '@nestjs/common';
import { TratamientoService } from './tratamiento.service';
import { TratamientoController } from './tratamiento.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [TratamientoController],
  providers: [TratamientoService],
  imports:[NatsModule]
})
export class TratamientoModule {}
