
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsObject, IsString, ValidateNested } from 'class-validator';
class ArchivoDto {
    @IsString()
    originalname: string;

    @IsString()
    mimetype: string;

    @IsString()
    path: string;
}

export class CreateExameneDto {
    @IsInt()
    @Type(() => Number)
    consulta_id: number;

    @IsInt()
    @Type(() => Number)
    empresa_id: number;

    @IsString()
    tipo: string;

    @IsEnum(['solicitud', 'resultado'])
    categoria: 'solicitud' | 'resultado';

    @IsString()
    descripcion: string;

    @IsInt()
    @Type(() => Number)
    userId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ArchivoDto)
    archivos: ArchivoDto[];
}