import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamenesService } from './examenes.service';
import { CreateExameneDto } from './dto/create-examene.dto';
import { UpdateExameneDto } from './dto/update-examene.dto';

@Controller()
export class ExamenesController {
  
  constructor(private readonly examenesService: ExamenesService,
    
  ) { 
    

  }

  @MessagePattern({ cmd: 'subir_examen_archivo' })
  async handleSubirArchivos(@Payload() data: CreateExameneDto) {
    console.log('📦 Payload recibido en microservicio:\n' + JSON.stringify(data, null, 2));
    try {
      return await this.examenesService.subirArchivosViaNats(data);
    } catch (error) {
      console.error('❌ Error en subir_examen_archivo:', error?.message);
      console.error('🧵 StackTrace:', error?.stack); // ✅ muestra dónde falló
      return {
        status: 'error',
        message: error?.message || 'Error interno en microservicio',
      };
    }
  }


  @MessagePattern({ cmd: 'obtener_examenes_por_consulta' })
  async listarPorConsulta(@Payload() data: { consultaId: number; userId: number }) {
    return this.examenesService.getPorConsulta(data.consultaId, data.userId);
  }


}
