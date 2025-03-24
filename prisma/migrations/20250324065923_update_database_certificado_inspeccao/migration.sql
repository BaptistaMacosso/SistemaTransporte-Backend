/*
  Warnings:

  - You are about to drop the column `funcionarioId` on the `tblusuarios` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tblusuarios" DROP CONSTRAINT "tblusuarios_funcionarioId_fkey";

-- DropIndex
DROP INDEX "tblusuarios_funcionarioId_key";

-- AlterTable
ALTER TABLE "tblusuarios" DROP COLUMN "funcionarioId";

-- CreateTable
CREATE TABLE "tblusuariofuncionario" (
    "userID" INTEGER NOT NULL,
    "FuncionarioID" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tblcertificadoinspeccao" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "centroInspeccao" VARCHAR(100) NOT NULL,
    "matricula" VARCHAR(15) NOT NULL,
    "numeroDoQuadro" VARCHAR(100) NOT NULL,
    "quilometragem" DECIMAL(10,2) NOT NULL,
    "dataHoraInspeccao" VARCHAR(100) NOT NULL,
    "proximaInspeccao" VARCHAR(10) NOT NULL,
    "numeroCertificado" VARCHAR(100) NOT NULL,
    "copiaDoCertificado" BYTEA NOT NULL,

    CONSTRAINT "tblcertificadoinspeccao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tblusuariofuncionario_userID_key" ON "tblusuariofuncionario"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "tblusuariofuncionario_FuncionarioID_key" ON "tblusuariofuncionario"("FuncionarioID");

-- AddForeignKey
ALTER TABLE "tblusuariofuncionario" ADD CONSTRAINT "tblusuariofuncionario_FuncionarioID_fkey" FOREIGN KEY ("FuncionarioID") REFERENCES "tblfuncionarios"("funcionarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblusuariofuncionario" ADD CONSTRAINT "tblusuariofuncionario_userID_fkey" FOREIGN KEY ("userID") REFERENCES "tblusuarios"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblcertificadoinspeccao" ADD CONSTRAINT "tblcertificadoinspeccao_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;
