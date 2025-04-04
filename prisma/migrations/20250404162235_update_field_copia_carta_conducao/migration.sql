/*
  Warnings:

  - You are about to drop the column `copiaCartaCoducao` on the `tblfuncionarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tblfuncionarios" DROP COLUMN "copiaCartaCoducao",
ADD COLUMN     "copiaCartaConducao" BYTEA;
