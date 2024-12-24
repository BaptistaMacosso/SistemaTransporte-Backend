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
    "viaturaTipoId" INTEGER NOT NULL,
    "viaturaCategoriaId" INTEGER NOT NULL,
    "viaturaMarca" VARCHAR(100) NOT NULL,
    "viaturaModelo" VARCHAR(30) NOT NULL,
    "viaturaMatricula" VARCHAR(15) NOT NULL,
    "viaturaAnoFabrica" VARCHAR(4) NOT NULL,
    "viaturaCombustivel" VARCHAR(10) NOT NULL,
    "viaturaCor" VARCHAR(45) NOT NULL,
    "quilometragem" VARCHAR(6) NOT NULL,

    CONSTRAINT "tblviaturas_pkey" PRIMARY KEY ("viaturaId")
);

-- CreateTable
CREATE TABLE "tblviaturaTipo" (
    "id" SERIAL NOT NULL,
    "viaturaTipo" VARCHAR(40) NOT NULL,

    CONSTRAINT "tblviaturaTipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblviaturaCategoria" (
    "id" SERIAL NOT NULL,
    "viaturaCategoria" VARCHAR(40) NOT NULL,

    CONSTRAINT "tblviaturaCategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblviaturamotorista" (
    "viaturaId" INTEGER NOT NULL,
    "motoristaId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tblmanutencao" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "tipoManutencaoId" INTEGER NOT NULL,
    "descricao" VARCHAR(250) NOT NULL,
    "dataManutencao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quilometragem" DOUBLE PRECISION NOT NULL,
    "responsavel" VARCHAR(100) NOT NULL,
    "statusManutencaoId" INTEGER NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tblmanutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbltipomanutencao" (
    "id" SERIAL NOT NULL,
    "tipoManutencao" VARCHAR(100) NOT NULL,

    CONSTRAINT "tbltipomanutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblstatusmanutencao" (
    "id" SERIAL NOT NULL,
    "statusManutencao" VARCHAR(100) NOT NULL,

    CONSTRAINT "tblstatusmanutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblchecklist" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "tipoManutencaoId" INTEGER NOT NULL,
    "quilometragem" DOUBLE PRECISION NOT NULL,
    "itemsVerificados" VARCHAR(100) NOT NULL,
    "observacao" VARCHAR(250) NOT NULL,
    "dataCheckList" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tblchecklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbllicencapublicidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "licencaNumero" VARCHAR(30) NOT NULL,
    "dataEmissao" VARCHAR(10) NOT NULL,
    "dataVencimento" VARCHAR(10) NOT NULL,
    "licencaStatus" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tbllicencapublicidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbllicencaTransportacao" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "observacao" VARCHAR(100) NOT NULL,
    "proprietario" VARCHAR(100) NOT NULL,
    "dataEmissao" VARCHAR(10) NOT NULL,
    "dataVencimento" VARCHAR(10) NOT NULL,
    "licencaStatus" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tbllicencaTransportacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblpedidos" (
    "pedidoId" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataSolicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipoServicoId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "prestadorId" INTEGER NOT NULL,

    CONSTRAINT "tblpedidos_pkey" PRIMARY KEY ("pedidoId")
);

-- CreateTable
CREATE TABLE "tblprestador" (
    "prestadorId" SERIAL NOT NULL,
    "prestadorNome" TEXT NOT NULL,
    "especialidade" VARCHAR(50) NOT NULL,
    "contato" VARCHAR(20),
    "endereco" VARCHAR(200),

    CONSTRAINT "tblprestador_pkey" PRIMARY KEY ("prestadorId")
);

-- CreateTable
CREATE TABLE "tbltiposervico" (
    "id" SERIAL NOT NULL,
    "tipoServico" VARCHAR(30) NOT NULL,

    CONSTRAINT "tbltiposervico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblstatus" (
    "statusId" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,

    CONSTRAINT "tblstatus_pkey" PRIMARY KEY ("statusId")
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
CREATE UNIQUE INDEX "tblviaturaTipo_viaturaTipo_key" ON "tblviaturaTipo"("viaturaTipo");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturaCategoria_viaturaCategoria_key" ON "tblviaturaCategoria"("viaturaCategoria");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturamotorista_viaturaId_key" ON "tblviaturamotorista"("viaturaId");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturamotorista_motoristaId_key" ON "tblviaturamotorista"("motoristaId");

-- CreateIndex
CREATE UNIQUE INDEX "tbltipomanutencao_tipoManutencao_key" ON "tbltipomanutencao"("tipoManutencao");

-- CreateIndex
CREATE UNIQUE INDEX "tblstatusmanutencao_statusManutencao_key" ON "tblstatusmanutencao"("statusManutencao");

-- CreateIndex
CREATE UNIQUE INDEX "tbllicencapublicidade_descricao_key" ON "tbllicencapublicidade"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tbllicencapublicidade_licencaNumero_key" ON "tbllicencapublicidade"("licencaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "tbllicencaTransportacao_viaturaId_key" ON "tbllicencaTransportacao"("viaturaId");

-- CreateIndex
CREATE UNIQUE INDEX "tbllicencaTransportacao_descricao_key" ON "tbllicencaTransportacao"("descricao");

-- AddForeignKey
ALTER TABLE "tblusuarios" ADD CONSTRAINT "tblusuarios_tipoUsuarioId_fkey" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tbltipousuarios"("tipoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblviaturas" ADD CONSTRAINT "tblviaturas_viaturaTipoId_fkey" FOREIGN KEY ("viaturaTipoId") REFERENCES "tblviaturaTipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblviaturas" ADD CONSTRAINT "tblviaturas_viaturaCategoriaId_fkey" FOREIGN KEY ("viaturaCategoriaId") REFERENCES "tblviaturaCategoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblviaturamotorista" ADD CONSTRAINT "tblviaturamotorista_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblviaturamotorista" ADD CONSTRAINT "tblviaturamotorista_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "tblmotoristas"("motoristaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblmanutencao" ADD CONSTRAINT "tblmanutencao_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblmanutencao" ADD CONSTRAINT "tblmanutencao_tipoManutencaoId_fkey" FOREIGN KEY ("tipoManutencaoId") REFERENCES "tbltipomanutencao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblmanutencao" ADD CONSTRAINT "tblmanutencao_statusManutencaoId_fkey" FOREIGN KEY ("statusManutencaoId") REFERENCES "tblstatusmanutencao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblchecklist" ADD CONSTRAINT "tblchecklist_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblchecklist" ADD CONSTRAINT "tblchecklist_tipoManutencaoId_fkey" FOREIGN KEY ("tipoManutencaoId") REFERENCES "tbltipomanutencao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbllicencaTransportacao" ADD CONSTRAINT "tbllicencaTransportacao_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblpedidos" ADD CONSTRAINT "tblpedidos_prestadorId_fkey" FOREIGN KEY ("prestadorId") REFERENCES "tblprestador"("prestadorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblpedidos" ADD CONSTRAINT "tblpedidos_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblpedidos" ADD CONSTRAINT "tblpedidos_tipoServicoId_fkey" FOREIGN KEY ("tipoServicoId") REFERENCES "tbltiposervico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblpedidos" ADD CONSTRAINT "tblpedidos_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "tblstatus"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;
