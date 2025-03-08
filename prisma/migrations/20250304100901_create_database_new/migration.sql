-- CreateTable
CREATE TABLE "tblusuarios" (
    "userId" SERIAL NOT NULL,
    "userNome" VARCHAR(100) NOT NULL,
    "userEmail" VARCHAR(100) NOT NULL,
    "userPassword" VARCHAR(200) NOT NULL,
    "tipoUsuarioId" INTEGER,
    "GrupoUsuarioId" INTEGER,
    "funcionarioId" INTEGER,

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
CREATE TABLE "tblgrupousuarios" (
    "grupoId" SERIAL NOT NULL,
    "grupoName" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(200),

    CONSTRAINT "tblgrupousuarios_pkey" PRIMARY KEY ("grupoId")
);

-- CreateTable
CREATE TABLE "tblpermissoes" (
    "permissaoId" SERIAL NOT NULL,
    "permissaonome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(200),
    "permitido" BOOLEAN NOT NULL DEFAULT false,
    "grupoId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "tblpermissoes_pkey" PRIMARY KEY ("permissaoId")
);

-- CreateTable
CREATE TABLE "tblfuncionarios" (
    "funcionarioId" SERIAL NOT NULL,
    "funcionarioNome" VARCHAR(150) NOT NULL,
    "numeroBI" VARCHAR(30) NOT NULL,
    "nacionalidade" VARCHAR(40) NOT NULL,
    "genero" VARCHAR(20) NOT NULL,
    "provincia" VARCHAR(40) NOT NULL,
    "funcionarioEmail" VARCHAR(100),
    "funcionarioTelefone" VARCHAR(20) NOT NULL,
    "CartaDeConducaoNr" VARCHAR(45) NOT NULL,
    "DataEmissao" VARCHAR(10) NOT NULL,
    "DataValidade" VARCHAR(10) NOT NULL,
    "categoriaId" VARCHAR(20),
    "funcaoTipoId" VARCHAR(30) NOT NULL,
    "copiaBI" BYTEA NOT NULL,
    "copiaCartaCoducao" BYTEA,
    "copiaLicencaConducao" BYTEA,
    "fotografia" BYTEA NOT NULL,
    "estado" VARCHAR(20) NOT NULL,

    CONSTRAINT "tblfuncionarios_pkey" PRIMARY KEY ("funcionarioId")
);

-- CreateTable
CREATE TABLE "tblfuncaoTipo" (
    "funcaoId" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "tblcategorias" (
    "categoriaId" VARCHAR(30) NOT NULL
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
    "quilometragem" DECIMAL(10,2) NOT NULL,

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
CREATE TABLE "tblviaturafuncionario" (
    "viaturaId" INTEGER NOT NULL,
    "funcionarioId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tblchecklist" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "checklistcategoriaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "quilometragem" DOUBLE PRECISION NOT NULL,
    "nivelCombustivel" VARCHAR(50) NOT NULL,
    "condicaoPneus" VARCHAR(100) NOT NULL,
    "observacao" VARCHAR(250),
    "dataCheckList" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tecnicoResponsavel" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "tblchecklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblchecklistItem" (
    "id" SERIAL NOT NULL,
    "checklistId" INTEGER NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "tblchecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblchecklistCategoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "tblchecklistCategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbllicencapublicidade" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "licencaNumero" VARCHAR(30) NOT NULL,
    "dataEmissao" VARCHAR(10) NOT NULL,
    "dataVencimento" VARCHAR(10) NOT NULL,
    "licencaStatus" BOOLEAN NOT NULL DEFAULT true,
    "copiaLicencaPublicidade" BYTEA NOT NULL,

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
    "copiaLicencaTransporte" BYTEA NOT NULL,
    "licencaStatus" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tbllicencaTransportacao_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "tblnotificacaoEmailJaEnviado" (
    "id" SERIAL NOT NULL,
    "licencaId" INTEGER NOT NULL,
    "emailJaEnviado" BOOLEAN NOT NULL DEFAULT false,
    "licencas" VARCHAR(50) NOT NULL,

    CONSTRAINT "tblnotificacaoEmailJaEnviado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblagendamentoServico" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "dataAgendada" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',

    CONSTRAINT "tblagendamentoServico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblcategoriaAssistencia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "tblcategoriaAssistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbltipoAssistencia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "tbltipoAssistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblservicos" (
    "id" SERIAL NOT NULL,
    "viaturaId" INTEGER NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "userId" INTEGER,
    "categoriaId" INTEGER NOT NULL,
    "dataServico" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "custo" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "observacoes" TEXT,
    "prestadorId" INTEGER NOT NULL,

    CONSTRAINT "tblservicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tblusuarios_userEmail_key" ON "tblusuarios"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "tblusuarios_funcionarioId_key" ON "tblusuarios"("funcionarioId");

-- CreateIndex
CREATE UNIQUE INDEX "tblfuncionarios_numeroBI_key" ON "tblfuncionarios"("numeroBI");

-- CreateIndex
CREATE UNIQUE INDEX "tblfuncionarios_nacionalidade_key" ON "tblfuncionarios"("nacionalidade");

-- CreateIndex
CREATE UNIQUE INDEX "tblfuncionarios_genero_key" ON "tblfuncionarios"("genero");

-- CreateIndex
CREATE UNIQUE INDEX "tblfuncionarios_provincia_key" ON "tblfuncionarios"("provincia");

-- CreateIndex
CREATE UNIQUE INDEX "tblfuncionarios_funcionarioEmail_key" ON "tblfuncionarios"("funcionarioEmail");

-- CreateIndex
CREATE UNIQUE INDEX "tblfuncionarios_funcionarioTelefone_key" ON "tblfuncionarios"("funcionarioTelefone");

-- CreateIndex
CREATE UNIQUE INDEX "tblfuncionarios_CartaDeConducaoNr_key" ON "tblfuncionarios"("CartaDeConducaoNr");

-- CreateIndex
CREATE UNIQUE INDEX "tblfuncaoTipo_funcaoId_key" ON "tblfuncaoTipo"("funcaoId");

-- CreateIndex
CREATE UNIQUE INDEX "tblcategorias_categoriaId_key" ON "tblcategorias"("categoriaId");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturas_viaturaMatricula_key" ON "tblviaturas"("viaturaMatricula");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturaTipo_viaturaTipo_key" ON "tblviaturaTipo"("viaturaTipo");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturaCategoria_viaturaCategoria_key" ON "tblviaturaCategoria"("viaturaCategoria");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturafuncionario_viaturaId_key" ON "tblviaturafuncionario"("viaturaId");

-- CreateIndex
CREATE UNIQUE INDEX "tblviaturafuncionario_funcionarioId_key" ON "tblviaturafuncionario"("funcionarioId");

-- CreateIndex
CREATE UNIQUE INDEX "tblchecklistCategoria_nome_key" ON "tblchecklistCategoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tbllicencapublicidade_descricao_key" ON "tbllicencapublicidade"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tbllicencapublicidade_licencaNumero_key" ON "tbllicencapublicidade"("licencaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "tbllicencaTransportacao_descricao_key" ON "tbllicencaTransportacao"("descricao");

-- AddForeignKey
ALTER TABLE "tblusuarios" ADD CONSTRAINT "tblusuarios_tipoUsuarioId_fkey" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tbltipousuarios"("tipoId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblusuarios" ADD CONSTRAINT "tblusuarios_GrupoUsuarioId_fkey" FOREIGN KEY ("GrupoUsuarioId") REFERENCES "tblgrupousuarios"("grupoId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblusuarios" ADD CONSTRAINT "tblusuarios_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "tblfuncionarios"("funcionarioId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblpermissoes" ADD CONSTRAINT "tblpermissoes_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "tblgrupousuarios"("grupoId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblpermissoes" ADD CONSTRAINT "tblpermissoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tblusuarios"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblfuncionarios" ADD CONSTRAINT "tblfuncionarios_funcaoTipoId_fkey" FOREIGN KEY ("funcaoTipoId") REFERENCES "tblfuncaoTipo"("funcaoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblfuncionarios" ADD CONSTRAINT "tblfuncionarios_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "tblcategorias"("categoriaId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblviaturas" ADD CONSTRAINT "tblviaturas_viaturaTipoId_fkey" FOREIGN KEY ("viaturaTipoId") REFERENCES "tblviaturaTipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblviaturas" ADD CONSTRAINT "tblviaturas_viaturaCategoriaId_fkey" FOREIGN KEY ("viaturaCategoriaId") REFERENCES "tblviaturaCategoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblviaturafuncionario" ADD CONSTRAINT "tblviaturafuncionario_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblviaturafuncionario" ADD CONSTRAINT "tblviaturafuncionario_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "tblfuncionarios"("funcionarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblchecklist" ADD CONSTRAINT "tblchecklist_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblchecklist" ADD CONSTRAINT "tblchecklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tblusuarios"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblchecklist" ADD CONSTRAINT "tblchecklist_checklistcategoriaId_fkey" FOREIGN KEY ("checklistcategoriaId") REFERENCES "tblchecklistCategoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblchecklistItem" ADD CONSTRAINT "tblchecklistItem_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "tblchecklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbllicencapublicidade" ADD CONSTRAINT "tbllicencapublicidade_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbllicencaTransportacao" ADD CONSTRAINT "tbllicencaTransportacao_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblagendamentoServico" ADD CONSTRAINT "tblagendamentoServico_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tblusuarios"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblagendamentoServico" ADD CONSTRAINT "tblagendamentoServico_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblagendamentoServico" ADD CONSTRAINT "tblagendamentoServico_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "tbltipoAssistencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbltipoAssistencia" ADD CONSTRAINT "tbltipoAssistencia_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "tblcategoriaAssistencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblservicos" ADD CONSTRAINT "tblservicos_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "tblviaturas"("viaturaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblservicos" ADD CONSTRAINT "tblservicos_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "tbltipoAssistencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblservicos" ADD CONSTRAINT "tblservicos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tblusuarios"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblservicos" ADD CONSTRAINT "tblservicos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "tblcategoriaAssistencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tblservicos" ADD CONSTRAINT "tblservicos_prestadorId_fkey" FOREIGN KEY ("prestadorId") REFERENCES "tblprestador"("prestadorId") ON DELETE RESTRICT ON UPDATE CASCADE;
