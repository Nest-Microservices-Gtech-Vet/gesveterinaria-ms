import { PartialType } from '@nestjs/mapped-types';
import { CreateMascotaDto } from './create-mascota.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateMascotaDto extends PartialType(CreateMascotaDto) {
  @IsNumber()
  @IsPositive()
  mas_id: number;
}
