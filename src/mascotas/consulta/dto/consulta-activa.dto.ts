import { IsInt } from 'class-validator';

export class ConsultaActivaDto {
    @IsInt()
    empresaId: string;

    @IsInt()
    mascotaId: string;
}
