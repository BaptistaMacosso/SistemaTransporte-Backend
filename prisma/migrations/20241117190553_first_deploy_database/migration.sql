-- CreateEnum
CREATE TYPE "TipoChecklist" AS ENUM ('DIARIO', 'SEMANAL');

-- CreateTable
CREATE TABLE "tblusuarios" (
    "userId" SERIAL NOT NULL,
    "userNome" VARCHAR(100) NOT NULL,
    "userEmail" VARCHAR(100) NOT NULL,
    "userPassword" VARCHAR(200) NOT NULL,
    "tipoUsuarioId" INTEGER NOT NULL,

    CONSTRAINT "tblusuarios_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "tbltipousuarios" (
    "tipoId" SERIAL NOT NULL,
    "descricaoTipo" VARCHAR(100) NOT NULL,
    "parametro_edit_config" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbltipousuarios_pkey" PRIMARY KEY ("tipoId")
);

-- CreateTable
CREATE TABLE "tblmotoristas" (
    "motoristaId" SERIAL NOT NULL,
    "motoristaNome" VARCHAR(150) NOT NULL,
    "numeroBI" VARCHAR(20),
    "motoristaEmail" VARCHAR(100),
    "motoristaTelefone" VARCHAR(20) NOT NULL,
    "CartaDeConducaoNr" VARCHAR(45) NOT NULL,
    "DataValidade" VARCHAR(10) NOT NULL,

    CONSTRAINT "tblmotoristas_pkey" PRIMARY KEY ("motoristaId")
);

-- CreateTable
CREATE TABLE "tblviaturas" (
    "viaturaId" SERIAL NOT NULL,
    "viaturaMarca" VARCHAR(100) NOT NULL,
    "viaturaModelo" VARCHAR(30) NOT NULL,
    "viaturaMatricula" VARCHAR(15) NOT NULL,
    "viaturaAnoFabrica" VARCHAR(4) NOT NULL,
    "viaturaCombustivel" VARCHAR(10) NOT NULL,
    "viaturaCor" VARCHAR(45) NOT NULL,
    "viaturaNumeroChassi" VARCHAR(80) NOT NULL,
    "viaturaNumeroLugar" VARCHAR(4) NOT NULL,
    "viaturaNumeroMotor" VARCHAR(80) NOT NULL,
    "quilometragem" VARCHAR(6) NOT NULL,

    CONSTRAINT "tblviaturas_pkey" PRIMARY KEY ("viaturaId")
);

-- CreateTable
CREATE TABLE "ViaturaMotorista" (
    "viaturaId" INTEGER NOT NULL,
    "motoristaId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tblplanomanutencao" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "dataManutencao" CHAR(10) NOT NULL,
    "descricao" VARCHAR(250) NOT NULL,
    "custoPrevisto" DECIMAL(18,2) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "tblplanomanutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblpublicidade" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "dataExpiracao" CHAR(10) NOT NULL,
    "descricao" VARCHAR(250) NOT NULL,

    CONSTRAINT "tblpublicidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblmanutencao" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quilometragem" INTEGER NOT NULL,
    "descricao" VARCHAR(250) NOT NULL,
    "servicos" VARCHAR(200) NOT NULL,
    "responsavel" VARCHAR(100) NOT NULL,

    CONSTRAINT "tblmanutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbltipomanutencao" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(20) NOT NULL,

    CONSTRAINT "tbltipomanutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblchecklist" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoChecklist" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacoes" VARCHAR(250) NOT NULL,
    "viaturaId" INTEGER NOT NULL,

    CONSTRAINT "tblchecklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tblusuarios_userEmail_key" ON "tblusuarios"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "tblmotoristas_numeroBI_key" ON "tblmotoristas"("numeroBI");

-- CreateIndex
CREATE UNIQUE INDEX "tblmotoristas_motoristaEmail_key" ON "tblmotoristas"("motoristaEmail");

-- CreateIndex
CREATE UNIQUE INDEX "tblmotoristas_motoristaTelefone_key" ON "tblmotoristas"("motoristaTelefone");

-- CreateIndex
CREATE UNIQUE INDEX "tblmotoristas_CartaDeConducaoNr_key" ON "tblmotoristas"("CartaDeConducaoNr");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturas_viaturaMatricula_key" ON "tblviaturas"("viaturaMatricula");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturas_viaturaNumeroChassi_key" ON "tblviaturas"("viaturaNumeroChassi");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturas_viaturaNumeroMotor_key" ON "tblviaturas"("viaturaNumeroMotor");

-- CreateIndex
CREATE UNIQUE INDEX "ViaturaMotorista_viaturaId_key" ON "ViaturaMotorista"("viaturaId");

-- CreateIndex
CREATE UNIQUE INDEX "ViaturaMotorista_motoristaId_key" ON "ViaturaMotorista"("motoristaId");

-- CreateIndex
CREATE UNIQUE INDEX "tbltipomanutencao_nome_key" ON "tbltipomanutencao"("nome");

-- AddForeignKey
ALTER TABLE "tblusuarios" ADD CONSTRAINT "tblusuarios_tipoUsuarioId_fkey" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tbltipousuarios"("tipoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViaturaMotorista" ADD CONSTRAINT "ViaturaMotorista_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViaturaMotorista" ADD CONSTRAINT "ViaturaMotorista_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "tblmotoristas"("motoristaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblplanomanutencao" ADD CONSTRAINT "tblplanomanutencao_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblpublicidade" ADD CONSTRAINT "tblpublicidade_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblmanutencao" ADD CONSTRAINT "tblmanutencao_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblmanutencao" ADD CONSTRAINT "tblmanutencao_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "tbltipomanutencao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblchecklist" ADD CONSTRAINT "tblchecklist_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;
