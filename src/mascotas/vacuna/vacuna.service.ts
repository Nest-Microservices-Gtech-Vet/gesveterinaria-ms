import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class VacunaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('GestVeterinaria-Service-Vacunas');

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('gesVeterinaria Mascotas conectado');
  }

  // ✅ Crear vacuna
  async createVacuna(
    createVacunaDto: CreateVacunaDto,
    user: { id: number },
    fotos?: { url: string; descripcion?: string }[]
  ) {
    try {
      const { valido } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: createVacunaDto.empresa_id,
          admin_id: user.id,
        })
        .toPromise();

      if (!valido) {
        throw new ForbiddenException('Empresa no autorizada para este usuario.');
      }

      // const consulta = await this.consulta.findFirst({
      //   where: {
      //     empresa_id: Number(createVacunaDto.empresa_id),
      //     mascota_id: Number(createVacunaDto.mascota_id),
      //     con_numero_mascota: Number(createVacunaDto.numeroConsulta),
      //   },
      // });


      // if (!consulta) {
      //   throw new NotFoundException('Consulta no encontrada.');
      // }

      const vacuna = await this.vacuna.create({
        data: {
          vac_nombre: createVacunaDto.vac_nombre,
          vac_tipo: createVacunaDto.vac_tipo,
          vac_fecha: new Date(createVacunaDto.vac_fecha),
          vac_proxima: createVacunaDto.vac_proxima ? new Date(createVacunaDto.vac_proxima) : null,
          vac_lote: createVacunaDto.vac_lote,
          vac_observacion: createVacunaDto.vac_observacion,
          empresa_id: Number(createVacunaDto.empresa_id),
          mascota_id: Number(createVacunaDto.mascota_id),
          historiaClinica_id: Number(createVacunaDto.historiaClinica_id), // ✅ NUEVO
          createdBy: user.id,
        }
      });


      // Guardar fotos (si las hay)
      if (fotos && fotos.length > 0) {
        await this.vacunaFoto.createMany({
          data: fotos.map(foto => ({
            vac_id: vacuna.vac_id,
            url: foto.url,
            descripcion: foto.descripcion || null,
          })),
        });
      }

      return vacuna;
    } catch (error) {
      this.logger.error('Error en registro de vacuna', error);
      throw new InternalServerErrorException('No se pudo registrar la vacuna');
    }
  }


  // ✅ Guardar múltiples fotos asociadas a una vacuna
  async guardarFotosVacuna(vacId: number, fotos: { url: string; descripcion?: string }[]) {
    try {
      if (!vacId) {
        throw new NotFoundException('ID de vacuna no proporcionado');
      }

      const vacuna = await this.vacuna.findUnique({ where: { vac_id: vacId } });
      if (!vacuna) throw new NotFoundException('Vacuna no encontrada');

      const fotosParaCrear = fotos.map(foto => ({
        vac_id: vacId,
        url: foto.url,
        descripcion: foto.descripcion,
      }));

      await this.vacunaFoto.createMany({
        data: fotosParaCrear,
      });

      return {
        status: 'ok',
        message: 'Fotos guardadas correctamente',
      };
    } catch (error) {
      this.logger.error('Error guardando fotos vacuna', error.stack || error.message);
      throw new InternalServerErrorException('Error guardando fotos de la vacuna');
    }
  }

  // async findByConsulta(consultaId: number) {
  //   return this.vacuna.findMany({
  //     where: {
  //       consulta_id: consultaId,
  //       activo: true,
  //     },
  //     include: {
  //       VacunaFoto: true,
  //     },
  //     orderBy: {
  //       vac_fecha: 'desc',
  //     },
  //   });
  // }


  async findByMascota(mascotaId: number) {
    return this.vacuna.findMany({
      where: {
        mascota_id: mascotaId,
        activo: true,
      },
      include: {
        VacunaFoto: true,
      },
      orderBy: {
        vac_fecha: 'desc',
      },
    });
  }
}
