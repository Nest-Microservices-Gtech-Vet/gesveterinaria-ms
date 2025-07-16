import { ForbiddenException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class HistoriaClinicaService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('GestVeterinaria-Service-Mascotas');
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {
    super();
  }
  onModuleInit() {
    this.$connect
    this.logger.log('gesVeterinania historial clinico Mascotas conectado')
  }

  //inicia crear historial clinico
  async create(createHistoriaClinicaDto: CreateHistoriaClinicaDto, user: { id: number }) {
    try {
      this.logger.debug('DTO recibido:', createHistoriaClinicaDto);
      this.logger.log(`Validando empresa ${createHistoriaClinicaDto.empresa_id} para el admin ${user.id}`);
      const { valido, motivo } = await this.client
        .send('empresas.validar-empresa-admin', {
          empresa_id: createHistoriaClinicaDto.empresa_id,
          admin_id: user.id,
        })
        .toPromise();

      if (!valido) {
        this.logger.warn(`Empresa no válida para el admin: ${motivo}`);
        throw new ForbiddenException('Empresa no autorizada para este usuario.');
      }

      const mascota = await this.mascota.findFirst({
        where: {
          mas_id: createHistoriaClinicaDto.mascota_id,
          empresa_id: createHistoriaClinicaDto.empresa_id,// multitenencia
        },
      });

      if (!mascota) throw new NotFoundException('Mascota no encontrada');


      const ultimoNumero = await this.historiaClinica.aggregate({
        where: { empresa_id: createHistoriaClinicaDto.empresa_id },
        _max: { hic_numero_local: true },
      });

      const nuevoNumero = (ultimoNumero._max.hic_numero_local ?? 0) + 1;

      const crearHistorialClinico = await this.historiaClinica.create({
        data: {
          hic_estado: createHistoriaClinicaDto.hic_estado ?? 'Abierta',
          empresa_id: createHistoriaClinicaDto.empresa_id,
          mascota_id: createHistoriaClinicaDto.mascota_id,
          hic_numero_local: nuevoNumero,
          createdBy: user.id,
        }
      });
      return crearHistorialClinico;
    } catch (error) {
      this.logger.error('Error en creación de historial clinico en service', error.stack || error.message);
      throw new InternalServerErrorException('No se pudo crear el historial clinico en service');

    }
  }
  //finaliza crear historial clinico
  //************************************************************************ */
  private async obtenerEmpresaIdDesdeMascota(mascota_id: number) {
    const mascota = await this.mascota.findUnique({
      where: { mas_id: mascota_id },
      select: { empresa_id: true },
    });

    if (!mascota) {
      throw new RpcException('Mascota no encontrada para asignar empresa_id');
    }

    return mascota.empresa_id;
  }
  //iniica obtener amscota histora clinica
  async findByMascota(mascota_id: number) {
    const historia = await this.historiaClinica.findUnique({
      where: { mascota_id },
      include: {
        mascota: {
          include: {
            propietario: true,
          },
        },
        consultas: {
          orderBy: {
            con_fecha: 'desc',
          },

          include: {
            Examen: true, // ✅ Aquí añades los exámenes
          },
        },
      },
    });

    if (!historia) {
      const empresa_id = await this.obtenerEmpresaIdDesdeMascota(mascota_id);
      const nuevoNumero = await this.generarNumeroHistoriaPorEmpresa(empresa_id);

      return this.historiaClinica.create({
        data: {
          mascota_id,
          empresa_id,
          hic_estado: 'Abierta',
          hic_numero_local: nuevoNumero,
        },
        include: {
          mascota: {
            include: {
              propietario: true,
            },
          },
          consultas: {
            orderBy: {
              con_fecha: 'desc',
            },
            include: {
              Examen: true,
            },
          },
        },
      });
    }

    return historia;
  }

  //fin obtener amscota histora clinica
  //************************************************************** */
  async findAll() {
    return `This action returns all historiaClinica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiaClinica`;
  }

  update(id: number, updateHistoriaClinicaDto: UpdateHistoriaClinicaDto) {
    return `This action updates a #${id} historiaClinica`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiaClinica`;
  }

  private async generarNumeroHistoriaPorEmpresa(empresa_id: number): Promise<number> {
    const maxHistoria = await this.historiaClinica.findFirst({
      where: { empresa_id },
      orderBy: { hic_numero_local: 'desc' },
      select: { hic_numero_local: true },
    });

    return maxHistoria?.hic_numero_local ? maxHistoria.hic_numero_local + 1 : 1;
  }

}
