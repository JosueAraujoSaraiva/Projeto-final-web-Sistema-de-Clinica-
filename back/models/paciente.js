const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const paciente = prisma.paciente

module.exports = paciente