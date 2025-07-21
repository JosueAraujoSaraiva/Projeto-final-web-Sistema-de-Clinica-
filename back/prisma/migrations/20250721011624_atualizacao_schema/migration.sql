-- CreateEnum
CREATE TYPE "StatusConsulta" AS ENUM ('AGENDADO', 'REALIZADO', 'CANCELADO');

-- AlterTable
ALTER TABLE "Consulta" ADD COLUMN     "status" "StatusConsulta" NOT NULL DEFAULT 'AGENDADO';
