/*
  Warnings:

  - Added the required column `vac_tipo` to the `Vacuna` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vacuna" ADD COLUMN     "vac_foto" VARCHAR(255),
ADD COLUMN     "vac_lote" VARCHAR(100),
ADD COLUMN     "vac_tipo" VARCHAR(100) NOT NULL;
