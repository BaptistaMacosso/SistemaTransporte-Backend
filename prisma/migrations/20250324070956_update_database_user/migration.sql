/*
  Warnings:

  - You are about to drop the column `GrupoUsuarioId` on the `tblusuarios` table. All the data in the column will be lost.
  - Added the required column `grupoUsuarioId` to the `tblusuarios` table without a default value. This is not possible if the table is not empty.
  - Made the column `tipoUsuarioId` on table `tblusuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tblusuarios" DROP CONSTRAINT "tblusuarios_GrupoUsuarioId_fkey";

-- DropForeignKey
ALTER TABLE "tblusuarios" DROP CONSTRAINT "tblusuarios_tipoUsuarioId_fkey";

-- AlterTable
ALTER TABLE "tblusuarios" DROP COLUMN "GrupoUsuarioId",
ADD COLUMN     "grupoUsuarioId" INTEGER NOT NULL,
ALTER COLUMN "tipoUsuarioId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tblusuarios" ADD CONSTRAINT "tblusuarios_tipoUsuarioId_fkey" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tbltipousuarios"("tipoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblusuarios" ADD CONSTRAINT "tblusuarios_grupoUsuarioId_fkey" FOREIGN KEY ("grupoUsuarioId") REFERENCES "tblgrupousuarios"("grupoId") ON DELETE RESTRICT ON UPDATE CASCADE;
