import {
  PrismaClient,
  TipoGasto,
  TipoPeriodo,
  TipoPatrimonio,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  // Família
  const familia = await prisma.familia.create({
    data: {
      nome: 'Helena Família',
    },
  });

  // Usuário
  const usuario = await prisma.usuario.create({
    data: {
      idFamilia: familia.id,
      email: 'helenafamilia@gmail.com',
      senha: 'HASH_DA_SENHA',
    },
  });

  // Membros
  const helena = await prisma.membro.create({
    data: {
      nome: 'Helena',
      idFamilia: familia.id,
      idUsuario: usuario.id,
    },
  });

  const ricardo = await prisma.membro.create({
    data: {
      nome: 'Ricardo',
      idFamilia: familia.id,
      idUsuario: usuario.id,
    },
  });

  const lucas = await prisma.membro.create({
    data: {
      nome: 'Lucas',
      idFamilia: familia.id,
      idUsuario: usuario.id,
    },
  });

  const zilma = await prisma.membro.create({
    data: {
      nome: 'Zilma',
      idFamilia: familia.id,
      idUsuario: usuario.id,
    },
  });

  // Categorias
  const categorias = await Promise.all([
    prisma.categoria.create({ data: { nome: 'Shopping' } }),
    prisma.categoria.create({ data: { nome: 'Telefone' } }),
    prisma.categoria.create({ data: { nome: 'Roupas' } }),
    prisma.categoria.create({ data: { nome: 'Faculdade' } }),
    prisma.categoria.create({ data: { nome: 'Almoço' } }),
    prisma.categoria.create({ data: { nome: 'Outros' } }),
  ]);

  // Salários
  await prisma.salario.createMany({
    data: [
      {
        idMembro: helena.id,
        salarioBruto: 1500,
        mesReferencia: new Date('2026-05-01'),
      },
      {
        idMembro: ricardo.id,
        salarioBruto: 1000,
        mesReferencia: new Date('2026-05-01'),
      },
      {
        idMembro: lucas.id,
        salarioBruto: 500,
        mesReferencia: new Date('2026-05-01'),
      },
    ],
  });

  // Patrimônios
  await prisma.patrimonio.createMany({
    data: [
      {
        idFamilia: familia.id,
        idMembro: helena.id,
        tipo: TipoPatrimonio.Imovel,
        nome: 'Casa',
        valor: 1000000,
      },
      {
        idFamilia: familia.id,
        idMembro: ricardo.id,
        tipo: TipoPatrimonio.Veiculo,
        nome: 'Carro',
        valor: 100000,
      },
    ],
  });

  // Despesas
  await prisma.despesa.createMany({
    data: [
      {
        idMembro: ricardo.id,
        idCategoria: categorias[1].id,
        nome: 'Telefone',
        valor: 400,
        data: new Date('2026-05-19'),
        tipo: TipoGasto.Fixo,
        periodo: TipoPeriodo.Mensal,
        parcelasPagas: 3,
        totalParcelas: 12,
      },
      {
        idMembro: lucas.id,
        idCategoria: categorias[3].id,
        nome: 'Faculdade',
        valor: 900,
        data: new Date('2026-05-19'),
        tipo: TipoGasto.Fixo,
        periodo: TipoPeriodo.Mensal,
        parcelasPagas: 2,
        totalParcelas: 6,
      },
      {
        idMembro: zilma.id,
        idCategoria: categorias[4].id,
        nome: 'Almoço',
        valor: 400,
        data: new Date('2026-05-19'),
        tipo: TipoGasto.Variavel,
      },
      {
        idMembro: helena.id,
        idCategoria: categorias[0].id,
        nome: 'Shopping',
        valor: 900,
        data: new Date('2026-05-19'),
        tipo: TipoGasto.Variavel,
      },
    ],
  });

  console.log('✅ Seed concluída!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });