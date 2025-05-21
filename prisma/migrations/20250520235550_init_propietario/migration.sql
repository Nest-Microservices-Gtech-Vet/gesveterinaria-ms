-- CreateTable
CREATE TABLE "Propietario" (
    "prop_id" SERIAL NOT NULL,
    "prop_identificacion" VARCHAR(255) NOT NULL,
    "prop_nombre" VARCHAR(255) NOT NULL,
    "prop_apellido" VARCHAR(255) NOT NULL,
    "prop_email" VARCHAR(255) NOT NULL,
    "prop_celular" VARCHAR(13) NOT NULL,
    "prop_direccion" VARCHAR(255) NOT NULL,
    "prop_observaciones" VARCHAR(255) NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Propietario_pkey" PRIMARY KEY ("prop_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Propietario_prop_identificacion_key" ON "Propietario"("prop_identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "Propietario_prop_email_key" ON "Propietario"("prop_email");
