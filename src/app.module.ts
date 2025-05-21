import { Module } from '@nestjs/common';

import { PropietariosModule } from './propietarios/propietarios.module';

@Module({
  imports: [PropietariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
