import { PartialType } from '@nestjs/mapped-types';
import { CreateTratamientoDto } from './create-tratamiento.dto';
import { CreateMedicamentoDto } from 'src/mascotas/medicamento/dto/create-medicamento.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTratamientoDto extends PartialType(CreateTratamientoDto) {
  // id: number;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMedicamentoDto)
  medicamentos?: Omit<CreateMedicamentoDto, 'tratamiento_id'>[];
}
