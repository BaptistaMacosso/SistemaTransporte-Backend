-- CreateTable
CREATE TABLE "tblnacionalidades" (
    "nacionalidadeId" VARCHAR(40) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tblnacionalidades_nacionalidadeId_key" ON "tblnacionalidades"("nacionalidadeId");

-- AddForeignKey
ALTER TABLE "tblfuncionarios" ADD CONSTRAINT "tblfuncionarios_nacionalidade_fkey" FOREIGN KEY ("nacionalidade") REFERENCES "tblnacionalidades"("nacionalidadeId") ON DELETE RESTRICT ON UPDATE CASCADE;
