-- AlterTable
ALTER TABLE "Consulta" ALTER COLUMN "mascota_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "Mascota"("mas_id") ON DELETE SET NULL ON UPDATE CASCADE;
