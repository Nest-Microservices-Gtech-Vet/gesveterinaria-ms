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
    "con_fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "con_motivo" VARCHAR(255) NOT NULL,
    "con_sintomas" VARCHAR(255),
    "con_diagnostico" VARCHAR(255),
    "con_tratamiento" VARCHAR(255),
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
    "vac_fecha" TIMESTAMP(3) NOT NULL,
    "vac_proxima" TIMESTAMP(3),
    "vac_observacion" VARCHAR(255),
    "consulta_id" INTEGER NOT NULL,
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
    "especie_id" INTEGER,
    "raza_id" INTEGER,
    "patologia_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EspecieRazaPatologia_pkey" PRIMARY KEY ("erp_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mascota_mas_microchip_key" ON "Mascota"("mas_microchip");

-- CreateIndex
CREATE UNIQUE INDEX "HistoriaClinica_mascota_id_key" ON "HistoriaClinica"("mascota_id");

-- CreateIndex
CREATE UNIQUE INDEX "Especie_esp_nombre_key" ON "Especie"("esp_nombre");

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "Especie"("esp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_raza_id_fkey" FOREIGN KEY ("raza_id") REFERENCES "Raza"("raz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriaClinica" ADD CONSTRAINT "HistoriaClinica_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "Mascota"("mas_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_historiaClinica_id_fkey" FOREIGN KEY ("historiaClinica_id") REFERENCES "HistoriaClinica"("hic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacuna" ADD CONSTRAINT "Vacuna_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "Consulta"("con_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raza" ADD CONSTRAINT "Raza_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "Especie"("esp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EspecieRazaPatologia" ADD CONSTRAINT "EspecieRazaPatologia_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "Especie"("esp_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EspecieRazaPatologia" ADD CONSTRAINT "EspecieRazaPatologia_raza_id_fkey" FOREIGN KEY ("raza_id") REFERENCES "Raza"("raz_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EspecieRazaPatologia" ADD CONSTRAINT "EspecieRazaPatologia_patologia_id_fkey" FOREIGN KEY ("patologia_id") REFERENCES "Patologia"("pat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
