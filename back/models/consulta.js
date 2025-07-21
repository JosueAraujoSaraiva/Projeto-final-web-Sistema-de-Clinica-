const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const consulta = prisma.consulta

module.exports = consulta