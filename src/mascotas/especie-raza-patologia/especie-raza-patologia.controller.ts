import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EspecieRazaPatologiaService } from './especie-raza-patologia.service';
import { CreateEspecieRazaPatologiaDto } from './dto/create-especie-raza-patologia.dto';
import { UpdateEspecieRazaPatologiaDto } from './dto/update-especie-raza-patologia.dto';

@Controller()
export class EspecieRazaPatologiaController {
  constructor(private readonly especieRazaPatologiaService: EspecieRazaPatologiaService) { }

  @MessagePattern('createEspecieRazaPatologia')
  create(@Payload() createEspecieRazaPatologiaDto: CreateEspecieRazaPatologiaDto) {
    return this.especieRazaPatologiaService.create(createEspecieRazaPatologiaDto);
  }

  @MessagePattern({ cmd: 'findAll_especieRazaPat' })
  findAll(@Payload() _payload: any) {
    return this.especieRazaPatologiaService.findAll();
  }



  @MessagePattern({ cmd: 'findByEspecieRaza' })
  async findByEspecieRaza(
    @Payload() payload: { especieId?: number | null; razaId?: number | null }
  ) {
    console.log('📥 Payload recibido en MICRO:', payload);

    return await this.especieRazaPatologiaService.getByEspecieRaza(
      payload.especieId ?? null,
      payload.razaId ?? null
    );
  }





  // Cambia el handler temporalmente
  @MessagePattern({ cmd: 'PRUEBA_MICRO' })
  handlePrueba(@Payload() data: any) {
    console.log('🔥 RECIBÍ MENSAJE DE PRUEBA:', data);
    return { ok: true };
  }





  @MessagePattern('findOneEspecieRazaPatologia')
  findOne(@Payload() id: number) {
    return this.especieRazaPatologiaService.findOne(id);
  }

  @MessagePattern('updateEspecieRazaPatologia')
  update(@Payload() updateEspecieRazaPatologiaDto: UpdateEspecieRazaPatologiaDto) {
    return this.especieRazaPatologiaService.update(updateEspecieRazaPatologiaDto.id, updateEspecieRazaPatologiaDto);
  }

  @MessagePattern('removeEspecieRazaPatologia')
  remove(@Payload() id: number) {
    return this.especieRazaPatologiaService.remove(id);
  }
}
