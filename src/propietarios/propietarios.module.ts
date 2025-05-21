import { Module } from '@nestjs/common';
import { PropietariosService } from './propietarios.service';
import { PropietariosController } from './propietarios.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PropietariosController],
  providers: [PropietariosService],
  imports:[
    NatsModule
  ]
})
export class PropietariosModule {}
