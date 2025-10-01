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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

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
    let vacunas;
    try {
      vacunas = await this.vacuna.findMany({
        where: {
          mascota_id: mascotaId,
          activo: true,
        },
        include: {
          VacunaFoto: true,
          mascota: { include: { propietario: true } }, // Mascota + propietario
        },
        orderBy: {
          vac_fecha: 'desc',
        },
      });
    } catch (error) {
      console.error('❌ Error al buscar vacunas en DB:', error);
      throw new RpcException({ message: 'Error traer vacunas', error });
    }

    if (!vacunas || vacunas.length === 0) {
      throw new RpcException({
        message: `[gesveterinaria-ms] No se encontraron vacunas para mascota #${mascotaId}`,
      });
    }

    const mascota = vacunas[0]?.mascota;
    if (!mascota) {
      throw new RpcException({
        message: `No se encontró la mascota para las vacunas #${mascotaId}`,
      });
    }

    const empresaId = mascota.empresa_id; // si tu modelo de mascota tiene empresa_id

    // 🔹 Buscar empresa
    let empresa = null;
    if (empresaId) {
      try {
        empresa = await firstValueFrom(
          this.client.send({ cmd: 'findOne_empresa' }, { emp_id: empresaId }),
        );
      } catch (e) {
        console.error('❌ No se pudo traer la empresa:', e?.message ?? e);
      }
    }

    // 🔹 Enriquecer cada vacuna con el médico que la creó
    const vacunasConMedico = await Promise.all(
      vacunas.map(async (v) => {
        let medico = null;
        if (v.createdBy) {
          try {
            medico = await firstValueFrom(
              this.client.send({ cmd: 'findOne_users' }, { id: v.createdBy }),
            );
          } catch (e) {
            console.error('❌ No se pudo traer el médico:', e?.message ?? e);
          }
        }
        return { ...v, medico };
      }),
    );

    return {
      empresa,
      propietario: mascota.propietario,
      mascota,
      vacunas: vacunasConMedico,
    };
  }





  /********************* */
  async updateVacuna(
    id: number,
    updateVacunaDto: UpdateVacunaDto,
    user: { id: number },
    fotos?: { url: string; descripcion?: string }[],
    archivosAEliminar?: number[],
  ) {
    try {
      // 🔐 Validación empresa-admin
      const { valido } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: updateVacunaDto.empresa_id,
          admin_id: user.id,
        })
        .toPromise();

      if (!valido) {
        throw new ForbiddenException('Empresa no autorizada para este usuario.');
      }

      // 📝 Actualizar datos básicos
      const vacuna = await this.vacuna.update({
        where: { vac_id: id },
        data: {
          vac_nombre: updateVacunaDto.vac_nombre,
          vac_tipo: updateVacunaDto.vac_tipo,
          vac_fecha: updateVacunaDto.vac_fecha
            ? new Date(updateVacunaDto.vac_fecha)
            : undefined,
          vac_proxima: updateVacunaDto.vac_proxima
            ? new Date(updateVacunaDto.vac_proxima)
            : null,
          vac_lote: updateVacunaDto.vac_lote,
          vac_observacion: updateVacunaDto.vac_observacion,
          updatedBy: user.id,
        },
      });

      // ❌ Eliminar fotos
      if (archivosAEliminar && archivosAEliminar.length > 0) {
        await this.vacunaFoto.deleteMany({
          where: {
            vf_id: { in: archivosAEliminar },
            vac_id: id,
          },
        });

        // 🔹 Opcional: borrar físicamente del disco
        // aquí puedes buscar las rutas de esas fotos y hacer fs.unlinkSync(path)
      }

      // ✅ Insertar nuevas fotos
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
      this.logger.error('Error en actualización de vacuna', error);
      throw new InternalServerErrorException('No se pudo actualizar la vacuna');
    }
  }


}
