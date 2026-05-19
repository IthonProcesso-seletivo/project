/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoGasto" AS ENUM ('Fixo', 'Variavel');

-- CreateEnum
CREATE TYPE "TipoPeriodo" AS ENUM ('Semanal', 'Quinzenal', 'Mensal', 'Anual');

-- CreateEnum
CREATE TYPE "TipoPatrimonio" AS ENUM ('Imovel', 'Veiculo', 'Investimento', 'Equipamento', 'Outros');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "familia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "familia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "idFamilia" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membro" (
    "id" SERIAL NOT NULL,
    "idFamilia" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "membro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "despesa" (
    "id" SERIAL NOT NULL,
    "idMembro" INTEGER NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "data" DATE NOT NULL,
    "tipo" "TipoGasto" NOT NULL,
    "periodo" "TipoPeriodo",
    "parcelasPagas" INTEGER,
    "totalParcelas" INTEGER,

    CONSTRAINT "despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salario" (
    "id" SERIAL NOT NULL,
    "idMembro" INTEGER NOT NULL,
    "salarioBruto" DECIMAL(10,2) NOT NULL,
    "mesReferencia" DATE NOT NULL,

    CONSTRAINT "salario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patrimonio" (
    "id" SERIAL NOT NULL,
    "idFamilia" INTEGER NOT NULL,
    "idMembro" INTEGER,
    "tipo" "TipoPatrimonio" NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "patrimonio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_idFamilia_key" ON "usuario"("idFamilia");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_idFamilia_fkey" FOREIGN KEY ("idFamilia") REFERENCES "familia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membro" ADD CONSTRAINT "membro_idFamilia_fkey" FOREIGN KEY ("idFamilia") REFERENCES "familia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membro" ADD CONSTRAINT "membro_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesa" ADD CONSTRAINT "despesa_idMembro_fkey" FOREIGN KEY ("idMembro") REFERENCES "membro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesa" ADD CONSTRAINT "despesa_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salario" ADD CONSTRAINT "salario_idMembro_fkey" FOREIGN KEY ("idMembro") REFERENCES "membro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patrimonio" ADD CONSTRAINT "patrimonio_idFamilia_fkey" FOREIGN KEY ("idFamilia") REFERENCES "familia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patrimonio" ADD CONSTRAINT "patrimonio_idMembro_fkey" FOREIGN KEY ("idMembro") REFERENCES "membro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
