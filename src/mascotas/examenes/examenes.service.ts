import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';
import { writeFile } from 'fs/promises'; // 👈 CORRECTO: usar fs/promises
import { CreateExameneDto } from './dto/create-examene.dto';
import { firstValueFrom } from 'rxjs';
import { existsSync, mkdirSync } from 'fs';


@Injectable()
export class ExamenesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('gesVeterinaria-Mascotas-Examenes');

  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('gesVeterinaria Mascotas conectado - Exámenes');

    const uploadDir = join(__dirname, '../../../uploads/examenes');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
      this.logger.log(`📂 Carpeta creada: ${uploadDir}`);
    }
  }

  async subirArchivosViaNats(data: CreateExameneDto) {
    try {
      this.logger.log('📦 Data recibida en subirArchivosViaNats: ' + JSON.stringify(data, null, 2));
      this.logger.log('Data recibida:', data);
      const {
        consulta_id,
        tipo,
        categoria,
        descripcion,
        archivos,
        userId,
      } = data;

      this.logger.log('⏳ Buscando consulta...');
      const consulta = await this.consulta.findUnique({
        where: { con_id: consulta_id },
      });

      if (!consulta) {
        this.logger.error('Consulta no encontrada con id ' + data.consulta_id);
        throw new NotFoundException('Consulta no encontrada');
      }

      this.logger.log('✅ Consulta encontrada, validando empresa...');

      // Validar empresa del usuario via NATS
      const { valido, motivo } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: consulta.empresa_id,
          admin_id: userId,
        })
        .toPromise();

      this.logger.log('🔐 Resultado de validación empresa-admin:', valido);

      if (!valido) {
        throw new ForbiddenException(motivo || 'No autorizado');
      }

      this.logger.log('🚀 Empresa validada, continuando con upsert...');

      // 🧩 upsert por consulta_id + tipo (recuerda tener @@unique en Prisma)
      const examen = await this.examen.upsert({
        where: {
          consulta_id_tipo: {
            consulta_id,
            exam_tipo: tipo,
          },
        },
        update: {},
        create: {
          consulta_id,
          exam_tipo: tipo,
          empresa_id: consulta.empresa_id,
          createdBy: userId,
        },
      });

      for (const archivo of archivos) {
        const urlLimpia = archivo.path.replace('uploads/', '');

        const yaExiste = await this.examenArchivo.findFirst({
          where: {
            examen_id: examen.exam_id,
            exa_url: urlLimpia,
          },
        });

        if (!yaExiste) {
          await this.examenArchivo.create({
            data: {
              examen_id: examen.exam_id,
              exa_categoria: categoria,
              exa_url: urlLimpia,
              exa_descripcion: descripcion,
              empresa_id: consulta.empresa_id,
              createdBy: userId,
            },
          });
        }
      }



      return { mensaje: 'Exámenes subidos con éxito' };
    } catch (err) {
      this.logger.error('🔥 Error inesperado en subirArchivosViaNats', err?.message);
      this.logger.error(err?.stack);
      throw err; 
    }
  }


  async getPorConsulta(consultaId: number, userId: number) {
    const consulta = await this.consulta.findUnique({
      where: { con_id: consultaId },
    });

    if (!consulta) throw new NotFoundException('Consulta no encontrada');

    const { valido } = await firstValueFrom(
      this.client.send('empresas.validar-empresa-admin', {
        empresa_id: consulta.empresa_id,
        admin_id: userId,
      }),
    );

    if (!valido) throw new ForbiddenException('No autorizado');

    return this.examen.findMany({
      where: { consulta_id: consultaId },
      include: { archivos: true },
    });
  }

}
