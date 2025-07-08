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

-- AddForeignKey
ALTER TABLE "vacuna_foto" ADD CONSTRAINT "vacuna_foto_vac_id_fkey" FOREIGN KEY ("vac_id") REFERENCES "Vacuna"("vac_id") ON DELETE RESTRICT ON UPDATE CASCADE;
