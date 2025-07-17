-- CreateTable
CREATE TABLE "Cliente" (
    "cli_id" SERIAL NOT NULL,
    "cli_identificacion" VARCHAR(255) NOT NULL,
    "cli_nombre" VARCHAR(255) NOT NULL,
    "cli_apellido" VARCHAR(255) NOT NULL,
    "cli_email" VARCHAR(255) NOT NULL,
    "cli_celular" VARCHAR(13) NOT NULL,
    "cli_direccion" VARCHAR(255) NOT NULL,
    "cli_observaciones" VARCHAR(255) NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cli_id")
);

-- CreateTable
CREATE TABLE "Mascota" (
    "mas_id" SERIAL NOT NULL,
    "mas_nombre" VARCHAR(255) NOT NULL,
    "mas_fechaNac" TIMESTAMP(3),
    "mas_peso" DOUBLE PRECISION,
    "mas_color" VARCHAR(255),
    "mas_esterilizado" BOOLEAN NOT NULL DEFAULT false,
    "mas_microchip" VARCHAR(255),
    "mas_foto" VARCHAR(255),
    "mas_notas" VARCHAR(255),
    "especie_id" INTEGER NOT NULL,
    "raza_id" INTEGER NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mascota_pkey" PRIMARY KEY ("mas_id")
);

-- CreateTable
CREATE TABLE "HistoriaClinica" (
    "hic_id" SERIAL NOT NULL,
    "hic_numero_local" INTEGER NOT NULL,
    "hic_estado" VARCHAR(50) NOT NULL DEFAULT 'Abierta',
    "mascota_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoriaClinica_pkey" PRIMARY KEY ("hic_id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "con_id" SERIAL NOT NULL,
    "con_numero_mascota" INTEGER,
    "con_fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mascota_id" INTEGER,
    "con_motivo" VARCHAR(255) NOT NULL,
    "con_peso" DOUBLE PRECISION,
    "con_temperaturaCorporal" DOUBLE PRECISION,
    "con_icc" TEXT,
    "con_pulso" INTEGER,
    "con_frecuenciaRespiratoria" INTEGER,
    "con_frecuenciaCardiaca" INTEGER,
    "con_hidratacion" VARCHAR(255),
    "con_mucosas" VARCHAR(255),
    "con_campoPulmonar" VARCHAR(255),
    "con_palpacionAbdominal" VARCHAR(255),
    "con_diagnosticoPresuntivo" VARCHAR(255),
    "con_observaciones" VARCHAR(255),
    "con_recomendaciones" VARCHAR(255),
    "historiaClinica_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("con_id")
);

-- CreateTable
CREATE TABLE "Vacuna" (
    "vac_id" SERIAL NOT NULL,
    "vac_nombre" VARCHAR(255) NOT NULL,
    "vac_tipo" VARCHAR(100) NOT NULL,
    "vac_fecha" TIMESTAMP(3) NOT NULL,
    "vac_proxima" TIMESTAMP(3),
    "vac_lote" VARCHAR(100),
    "vac_foto" VARCHAR(255),
    "vac_observacion" VARCHAR(255),
    "historiaClinica_id" INTEGER NOT NULL,
    "mascota_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacuna_pkey" PRIMARY KEY ("vac_id")
);

-- CreateTable
CREATE TABLE "Especie" (
    "esp_id" SERIAL NOT NULL,
    "esp_nombre" VARCHAR(255) NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Especie_pkey" PRIMARY KEY ("esp_id")
);

-- CreateTable
CREATE TABLE "Raza" (
    "raz_id" SERIAL NOT NULL,
    "raz_nombre" VARCHAR(255) NOT NULL,
    "especie_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Raza_pkey" PRIMARY KEY ("raz_id")
);

-- CreateTable
CREATE TABLE "Patologia" (
    "pat_id" SERIAL NOT NULL,
    "pat_nombre" VARCHAR(255) NOT NULL,
    "pat_desc" VARCHAR(255),
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patologia_pkey" PRIMARY KEY ("pat_id")
);

-- CreateTable
CREATE TABLE "EspecieRazaPatologia" (
    "erp_id" SERIAL NOT NULL,
    "especie_id" INTEGER NOT NULL,
    "raza_id" INTEGER NOT NULL,
    "patologia_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EspecieRazaPatologia_pkey" PRIMARY KEY ("erp_id")
);

-- CreateTable
CREATE TABLE "ConsultaPatologia" (
    "cp_id" SERIAL NOT NULL,
    "consulta_id" INTEGER NOT NULL,
    "patologia_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultaPatologia_pkey" PRIMARY KEY ("cp_id")
);

-- CreateTable
CREATE TABLE "vacuna_foto" (
    "vf_id" SERIAL NOT NULL,
    "vac_id" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacuna_foto_pkey" PRIMARY KEY ("vf_id")
);

-- CreateTable
CREATE TABLE "Tratamiento" (
    "tra_id" SERIAL NOT NULL,
    "consulta_id" INTEGER NOT NULL,
    "mascota_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tratamiento_pkey" PRIMARY KEY ("tra_id")
);

-- CreateTable
CREATE TABLE "Medicamento" (
    "med_id" SERIAL NOT NULL,
    "tratamiento_id" INTEGER NOT NULL,
    "med_nombre" VARCHAR(255) NOT NULL,
    "med_dosis" VARCHAR(255) NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicamento_pkey" PRIMARY KEY ("med_id")
);

-- CreateTable
CREATE TABLE "Examen" (
    "exam_id" SERIAL NOT NULL,
    "consulta_id" INTEGER NOT NULL,
    "exam_tipo" TEXT NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Examen_pkey" PRIMARY KEY ("exam_id")
);

-- CreateTable
CREATE TABLE "ExamenArchivo" (
    "exa_id" SERIAL NOT NULL,
    "examen_id" INTEGER NOT NULL,
    "exa_categoria" TEXT NOT NULL,
    "exa_url" TEXT NOT NULL,
    "exa_descripcion" TEXT NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamenArchivo_pkey" PRIMARY KEY ("exa_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cli_identificacion_key" ON "Cliente"("cli_identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cli_email_key" ON "Cliente"("cli_email");

-- CreateIndex
CREATE UNIQUE INDEX "Mascota_mas_microchip_key" ON "Mascota"("mas_microchip");

-- CreateIndex
CREATE UNIQUE INDEX "HistoriaClinica_mascota_id_key" ON "HistoriaClinica"("mascota_id");

-- CreateIndex
CREATE UNIQUE INDEX "Especie_esp_nombre_key" ON "Especie"("esp_nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Examen_consulta_id_exam_tipo_key" ON "Examen"("consulta_id", "exam_tipo");

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "Especie"("esp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_raza_id_fkey" FOREIGN KEY ("raza_id") REFERENCES "Raza"("raz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriaClinica" ADD CONSTRAINT "HistoriaClinica_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "Mascota"("mas_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "Mascota"("mas_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_historiaClinica_id_fkey" FOREIGN KEY ("historiaClinica_id") REFERENCES "HistoriaClinica"("hic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacuna" ADD CONSTRAINT "Vacuna_historiaClinica_id_fkey" FOREIGN KEY ("historiaClinica_id") REFERENCES "HistoriaClinica"("hic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacuna" ADD CONSTRAINT "Vacuna_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "Mascota"("mas_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raza" ADD CONSTRAINT "Raza_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "Especie"("esp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EspecieRazaPatologia" ADD CONSTRAINT "EspecieRazaPatologia_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "Especie"("esp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EspecieRazaPatologia" ADD CONSTRAINT "EspecieRazaPatologia_raza_id_fkey" FOREIGN KEY ("raza_id") REFERENCES "Raza"("raz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EspecieRazaPatologia" ADD CONSTRAINT "EspecieRazaPatologia_patologia_id_fkey" FOREIGN KEY ("patologia_id") REFERENCES "Patologia"("pat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultaPatologia" ADD CONSTRAINT "ConsultaPatologia_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "Consulta"("con_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultaPatologia" ADD CONSTRAINT "ConsultaPatologia_patologia_id_fkey" FOREIGN KEY ("patologia_id") REFERENCES "Patologia"("pat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacuna_foto" ADD CONSTRAINT "vacuna_foto_vac_id_fkey" FOREIGN KEY ("vac_id") REFERENCES "Vacuna"("vac_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tratamiento" ADD CONSTRAINT "Tratamiento_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "Consulta"("con_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicamento" ADD CONSTRAINT "Medicamento_tratamiento_id_fkey" FOREIGN KEY ("tratamiento_id") REFERENCES "Tratamiento"("tra_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "Consulta"("con_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenArchivo" ADD CONSTRAINT "ExamenArchivo_examen_id_fkey" FOREIGN KEY ("examen_id") REFERENCES "Examen"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;
