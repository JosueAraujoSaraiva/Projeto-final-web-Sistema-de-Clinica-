const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const funcionario = prisma.funcionario

module.exports = funcionario