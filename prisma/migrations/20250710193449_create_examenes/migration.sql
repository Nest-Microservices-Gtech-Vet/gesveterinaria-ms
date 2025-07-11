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

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "Consulta"("con_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenArchivo" ADD CONSTRAINT "ExamenArchivo_examen_id_fkey" FOREIGN KEY ("examen_id") REFERENCES "Examen"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;
