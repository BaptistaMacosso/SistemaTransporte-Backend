/*
  Warnings:

  - You are about to drop the column `checklistcategoriaId` on the `tblchecklist` table. All the data in the column will be lost.
  - You are about to drop the column `quilometragem` on the `tblchecklist` table. All the data in the column will be lost.
  - You are about to drop the column `tecnicoResponsavel` on the `tblchecklist` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tblchecklist` table. All the data in the column will be lost.
  - You are about to drop the `tblchecklistCategoria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `motoristaId` to the `tblchecklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `odometro` to the `tblchecklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marcado` to the `tblchecklistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tblchecklist" DROP CONSTRAINT "tblchecklist_checklistcategoriaId_fkey";

-- DropForeignKey
ALTER TABLE "tblchecklist" DROP CONSTRAINT "tblchecklist_userId_fkey";

-- AlterTable
ALTER TABLE "tblchecklist" DROP COLUMN "checklistcategoriaId",
DROP COLUMN "quilometragem",
DROP COLUMN "tecnicoResponsavel",
DROP COLUMN "userId",
ADD COLUMN     "motoristaId" INTEGER NOT NULL,
ADD COLUMN     "odometro" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "tblchecklistItem" ADD COLUMN     "marcado" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "tblchecklistCategoria";

-- AddForeignKey
ALTER TABLE "tblchecklist" ADD CONSTRAINT "tblchecklist_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "tblfuncionarios"("funcionarioId") ON DELETE RESTRICT ON UPDATE CASCADE;
