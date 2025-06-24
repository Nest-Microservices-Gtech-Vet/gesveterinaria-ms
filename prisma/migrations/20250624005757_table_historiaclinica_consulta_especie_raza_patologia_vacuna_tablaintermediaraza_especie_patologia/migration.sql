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

-- AddForeignKey
ALTER TABLE "ConsultaPatologia" ADD CONSTRAINT "ConsultaPatologia_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "Consulta"("con_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultaPatologia" ADD CONSTRAINT "ConsultaPatologia_patologia_id_fkey" FOREIGN KEY ("patologia_id") REFERENCES "Patologia"("pat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
