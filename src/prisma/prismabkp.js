// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
    provider = "prisma-client-js"
  }
  
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  
  model User {
    userId         Int     @id @default(autoincrement())
    userNome       String  @db.VarChar(100)
    userEmail      String  @unique @db.VarChar(100)
    userPassword   String  @db.VarChar(200)
    tipoUsuarioId  Int?
    GrupoUsuarioId Int?
    funcionarioId  Int? @unique
    tipoUser       TipoUser? @relation(fields: [tipoUsuarioId], references: [tipoId])
    grupoUser      GrupoUser? @relation(fields: [GrupoUsuarioId], references: [grupoId])
    funcionario    Funcionario? @relation(fields: [funcionarioId], references: [funcionarioId])
    permissoes     Permissao[]
    servicos       Servico[]
    agendamento    Agendamento[]
    @@map("tblusuarios")
  }
  
  model TipoUser{
    tipoId Int @id @default(autoincrement())
    descricaoTipo String  @db.VarChar(100)
    parametro_edit_config Boolean @default(false)
    user User[]
    @@map("tbltipousuarios")
  }
  
  model GrupoUser {
    grupoId       Int          @id @default(autoincrement())
    grupoName     String       @db.VarChar(100)
    descricao     String?      @db.VarChar(200)
    permissoes    Permissao[]
    usuarios      User[] 
    @@map("tblgrupousuarios")
  }
  
  model Permissao {
    permissaoId    Int     @id @default(autoincrement())
    permissaonome  String  @db.VarChar(100)
    descricao      String? @db.VarChar(200)
    permitido      Boolean @default(false)
    grupoId        Int?
    userId         Int?
    grupoUser      GrupoUser? @relation(fields: [grupoId], references: [grupoId])
    user           User?      @relation(fields: [userId], references: [userId])
    @@map("tblpermissoes")
  }
  
  model Funcionario {
    funcionarioId        Int      @id @default(autoincrement())
    funcionarioNome      String   @db.VarChar(150)
    numeroBI             String   @unique @db.VarChar(30)
    nacionalidade        String   @unique @db.VarChar(40)
    genero               String   @unique @db.VarChar(20)
    provincia            String   @unique @db.VarChar(40)
    funcionarioEmail     String?  @unique @db.VarChar(100)
    funcionarioTelefone  String   @unique @db.VarChar(20)
    CartaDeConducaoNr    String   @unique @db.VarChar(45) 
    DataEmissao          String   @db.VarChar(10)
    DataValidade         String   @db.VarChar(10)
    categoriaId          String?  @db.VarChar(20)
    funcaoTipoId         String   @db.VarChar(30)
    copiaBI              Bytes    @db.ByteA
    copiaCartaCoducao    Bytes?   @db.ByteA
    copiaLicencaConducao Bytes?   @db.ByteA
    fotografia           Bytes    @db.ByteA
    estado               String   @db.VarChar(20) 
    funcaoTipo           FuncaoTipo @relation(fields: [funcaoTipoId], references: [funcaoId])
    categorias           Categorias? @relation(fields: [categoriaId], references: [categoriaId])
    viaturaFuncionario   ViaturaFuncionario[]
    user                 User[]
    @@map("tblfuncionarios")
  }
  
  model FuncaoTipo{
    funcaoId  String @db.VarChar(30) @unique
    funcionario     Funcionario[]
    @@map("tblfuncaoTipo")
  }
  
  model Categorias{
    categoriaId  String @db.VarChar(30) @unique
    funcionario     Funcionario[]
    @@map("tblcategorias")
  }
  
  model Viatura {
    viaturaId           Int    @id @default(autoincrement())
    viaturaTipoId       Int
    viaturaCategoriaId  Int
    viaturaMarca        String @db.VarChar(100)
    viaturaModelo       String @db.VarChar(30)
    viaturaMatricula    String @unique @db.VarChar(15)
    viaturaAnoFabrica   String @db.VarChar(4) 
    viaturaCombustivel  String @db.VarChar(10)
    viaturaCor          String @db.VarChar(45) 
    quilometragem       Decimal @db.Decimal(10,2)
    viaturaTipo         ViaturaTipo @relation(fields: [viaturaTipoId], references: [id])
    viaturaCategoria    ViaturaCategoria @relation(fields: [viaturaCategoriaId], references: [id])
    historicoManutencao Manutencao[]
    checklistViatura    Checklist[]
    viaturaFuncionario  ViaturaFuncionario[]
    licencaViatura      LicencaTransportacaoViaturas[]
    licencaPublicidade  LicencaPublicidadeViaturas[]
    pedidos             Pedido[]
     servicos           Servico[]
    agendamentos        Agendamento[]
    @@map("tblviaturas")
  }
  
  model ViaturaTipo{
    id          Int @id @default(autoincrement())
    viaturaTipo String @db.VarChar(40) @unique
    viatura     Viatura[]
    @@map("tblviaturaTipo")
  }
  
  model ViaturaCategoria{
    id               Int @id @default(autoincrement())
    viaturaCategoria String @db.VarChar(40) @unique
    viatura          Viatura[]
    @@map("tblviaturaCategoria")
  }
  
  model ViaturaFuncionario{
    viaturaId      Int @unique
    viatura        Viatura @relation(fields: [viaturaId], references: [viaturaId])
    funcionarioId  Int @unique
    funcionario    Funcionario @relation(fields: [funcionarioId], references: [funcionarioId])
    @@map("tblviaturafuncionario")
  }
  
  model Manutencao {
    id               Int @id @default(autoincrement())
    viaturaId        Int
    tipoManutencaoId Int
    descricao        String    @db.VarChar(250)
    dataManutencao   DateTime?  @default(now())
    quilometragem    Float     @db.DoublePrecision
    responsavel      String    @db.VarChar(100)
    statusManutencaoId Int
    dataCriacao      DateTime?  @default(now())
    viatura          Viatura   @relation(fields: [viaturaId], references: [viaturaId])
    tipoManutencao   TipoManutencao   @relation(fields: [tipoManutencaoId], references: [id])
    statusManutencao StatusManutencao @relation(fields: [statusManutencaoId], references: [id])
    @@map("tblmanutencao")
  }
  
  model TipoManutencao {
    id             Int     @id @default(autoincrement())
    tipoManutencao String  @db.VarChar(100) @unique
    checkList      Checklist[]
    manutencao     Manutencao[]
    @@map("tbltipomanutencao")
  }
  
  model StatusManutencao {
    id               Int     @id @default(autoincrement())
    statusManutencao String  @db.VarChar(100) @unique
    manutencao       Manutencao[]
    @@map("tblstatusmanutencao")
  }
  
  model Checklist {
    id               Int       @id @default(autoincrement())
    viaturaId        Int
    tipoManutencaoId Int
    quilometragem    Float     @db.DoublePrecision
    itemsVerificados String    @db.VarChar(100)
    observacao       String    @db.VarChar(250)
    dataCheckList    DateTime  @default(now())
    tecnicoResponsavel String    @db.VarChar(100)
    viatura          Viatura   @relation(fields: [viaturaId], references: [viaturaId])
    tipoManutencao   TipoManutencao @relation(fields: [tipoManutencaoId], references: [id])
     @@map("tblchecklist")
  }
  
  model LicencaPublicidadeViaturas{
    id                      Int @id @default(autoincrement())
    viaturaId               Int  
    descricao               String @db.VarChar(100) @unique
    licencaNumero           String @db.VarChar(30) @unique
    dataEmissao             String @db.VarChar(10)
    dataVencimento          String @db.VarChar(10)
    licencaStatus           Boolean @default(true)
    copiaLicencaPublicidade Bytes @db.ByteA
    viatura                 Viatura @relation(fields: [viaturaId], references: [viaturaId]) 
    @@map("tbllicencapublicidade")
  }
  
  model LicencaTransportacaoViaturas{
    id                     Int @id @default(autoincrement())
    viaturaId              Int  
    descricao              String @db.VarChar(200) @unique
    observacao             String @db.VarChar(100) 
    proprietario           String @db.VarChar(100) 
    dataEmissao            String @db.VarChar(10)
    dataVencimento         String @db.VarChar(10)
    copiaLicencaTransporte Bytes @db.ByteA
    licencaStatus          Boolean @default(true)
    viatura                Viatura @relation(fields: [viaturaId], references: [viaturaId]) 
    @@map("tbllicencaTransportacao")
  }
  
  model Pedido {
    pedidoId         Int @id @default(autoincrement())
    viaturaId        Int
    descricao        String
    dataSolicitacao  DateTime  @default(now())
    tipoServicoId    Int
    statusId         Int
    prestadorId      Int
    prestador        Prestador @relation(fields: [prestadorId], references: [prestadorId])
    viatura          Viatura @relation(fields: [viaturaId], references: [viaturaId])
    tipoServico      TipoServico @relation(fields: [tipoServicoId], references: [id])
    status           Status @relation(fields: [statusId], references: [statusId])
    @@map("tblpedidos")
  }
  
  model Prestador {
    prestadorId   Int  @id @default(autoincrement())
    prestadorNome String
    especialidade String @db.VarChar(50)
    contato       String? @db.VarChar(20)
    endereco      String? @db.VarChar(200)
    pedidos       Pedido[]
    servico       Servico[]
    @@map("tblprestador")
  }
  
  model TipoServico {
    id          Int  @id @default(autoincrement())
    tipoServico String @db.VarChar(30) 
    pedido      Pedido[]
    @@map("tbltiposervico")
  }
  
  model Status {
    statusId   Int  @id @default(autoincrement())
    descricao  String @db.VarChar(30)
    pedido     Pedido[]
    @@map("tblstatus")
  }
  
  model NotificacaoEmailJaEnviado{
    id Int @id @default(autoincrement())
    licencaId Int
    emailJaEnviado Boolean @default(false)
    licencas String @db.VarChar(50) 
    @@map("tblnotificacaoEmailJaEnviado")
  }
  
  model Agendamento {
    id          Int      @id @default(autoincrement())
    userId      Int
    viaturaId   Int
    tipoId      Int
    dataAgendada DateTime
    status      String   @default("Pendente") // Pode ser 'Pendente', 'Concluído', 'Cancelado'
    usuario     User  @relation(fields: [userId], references: [userId])
    viatura     Viatura  @relation(fields: [viaturaId], references: [viaturaId])
    tipo        TipoAssistencia @relation(fields: [tipoId], references: [id])
  }
  
  model CategoriaAssistencia {
    id         Int      @id @default(autoincrement())
    nome       String   // Ex: "Manutenção Preventiva", "Manutenção Corretiva"
    descricao  String?
    tipos      TipoAssistencia[]
    servico    Servico[]
  }
  
  model TipoAssistencia {
    id         Int      @id @default(autoincrement())
    nome       String   // Ex: "Troca de Óleo", "Revisão dos Freios"
    descricao  String?
    categoriaId Int
    categoria  CategoriaAssistencia @relation(fields: [categoriaId], references: [id])
    servicos   Servico[]
    agendamentos Agendamento[]
  }
  
  model Servico {
    id            Int      @id @default(autoincrement())
    viaturaId     Int
    tipoId        Int
    userId        Int?
    categoriaId   Int
    dataServico   DateTime @default(now())
    custo         Decimal  @default(0.0)
    observacoes   String?
    prestadorId   Int
    viatura       Viatura  @relation(fields: [viaturaId], references: [viaturaId])
    tipo          TipoAssistencia @relation(fields: [tipoId], references: [id])
    usuario       User? @relation(fields: [userId], references: [userId])
    categoria     CategoriaAssistencia @relation(fields: [categoriaId], references: [id])
    prestador     Prestador @relation(fields: [prestadorId], references: [prestadorId])
  }
  
  