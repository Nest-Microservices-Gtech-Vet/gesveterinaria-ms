import { Module } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { HistoriaClinicaModule } from './historia-clinica/historia-clinica.module';
import { ConsultaModule } from './consulta/consulta.module';
import { VacunaModule } from './vacuna/vacuna.module';
import { EspecieModule } from './especie/especie.module';
import { RazaModule } from './raza/raza.module';
import { PatologiaModule } from './patologia/patologia.module';
import { EspecieRazaPatologiaModule } from './especie-raza-patologia/especie-raza-patologia.module';
import { NatsModule } from 'src/transports/nats.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';
import { MedicamentoModule } from './medicamento/medicamento.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';
import { MedicamentoModule } from './medicamento/medicamento.module';

@Module({
  controllers: [MascotasController],
  providers: [MascotasService],
  imports: [HistoriaClinicaModule, ConsultaModule, VacunaModule, EspecieModule, RazaModule, PatologiaModule, EspecieRazaPatologiaModule, NatsModule, TratamientoModule, MedicamentoModule],
})
export class MascotasModule {}
