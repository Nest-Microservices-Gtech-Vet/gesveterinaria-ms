import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { EspecieRazaPatologiaModule } from './mascotas/especie-raza-patologia/especie-raza-patologia.module';



@Module({
  imports: [ClientesModule, MascotasModule,EspecieRazaPatologiaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
