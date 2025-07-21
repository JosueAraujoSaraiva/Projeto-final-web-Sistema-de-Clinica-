-- DropForeignKey
ALTER TABLE "Consulta" DROP CONSTRAINT "Consulta_funcionarioId_fkey";

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
