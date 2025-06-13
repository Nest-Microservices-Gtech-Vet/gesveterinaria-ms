import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { MascotasModule } from './mascotas/mascotas.module';



@Module({
  imports: [ClientesModule, MascotasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
