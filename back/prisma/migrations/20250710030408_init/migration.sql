/*
  Warnings:

  - Added the required column `cpf` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "endereco" TEXT NOT NULL;
