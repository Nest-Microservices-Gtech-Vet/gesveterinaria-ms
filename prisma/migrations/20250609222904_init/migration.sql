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

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cli_identificacion_key" ON "Cliente"("cli_identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cli_email_key" ON "Cliente"("cli_email");
