/*
  Warnings:

  - A unique constraint covering the columns `[consulta_id,exam_tipo]` on the table `Examen` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Examen_consulta_id_exam_tipo_key" ON "Examen"("consulta_id", "exam_tipo");
