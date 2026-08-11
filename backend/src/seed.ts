import { PrismaClient } from "@prisma/client";
import { createUUID } from "./utils/createUUID";

const prisma = new PrismaClient();

const DEFAULT_ANIMALS = [
  { id: createUUID(), name: 'Subulo gouazoubira', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Sus scrofa', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Dicotyles tajacu', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Bos taurus', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Cerdocyon thous', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Leopardus guttulus', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Leopardus pardalis', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Leopardus wiedii', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Puma concolor', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Herpailurus yagouaroundi', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Eira barbara', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Canis familiaris', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Nasua nasua', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Procyon cancrivorus', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Dasypus novemcinctus', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Euphractus sexcinctus', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Cabasous tatouay', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Didelphis albiventris', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Didelphis aurita', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Tapirus terrestris', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Tamandua tetradactyla', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Alouatta Guariba', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Sapajus nigritus', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Hydrochoerus hydrochaeris', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Cuniculus paca', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Dasyprocta azarae', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Coendou spinosus', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Lepus europaeus', createdAt: new Date(), updatedAt: new Date() },
  { id: createUUID(), name: 'Sylvilagus minensis', createdAt: new Date(), updatedAt: new Date() },
];

const DEFAULT_GROUPS = [
    { id: createUUID(),  name:'Artiodactyla', createdAt: new Date(), updatedAt: new Date()},
    { id: createUUID(),  name:'Carnivora', createdAt: new Date(), updatedAt: new Date()},
    { id: createUUID(),  name:'Cingulata', createdAt: new Date(), updatedAt: new Date()},
    { id: createUUID(),  name:'Didelphimorphia', createdAt: new Date(), updatedAt: new Date()},
    { id: createUUID(),  name:'Perissodactyla', createdAt: new Date(), updatedAt: new Date()},
    { id: createUUID(),  name:'Pilosa', createdAt: new Date(), updatedAt: new Date()},
    { id: createUUID(),  name:'Primates', createdAt: new Date(), updatedAt: new Date()},
    { id: createUUID(),  name:'Rodentia', createdAt: new Date(), updatedAt: new Date()},
    { id: createUUID(),  name:'Lagomorpha', createdAt: new Date(), updatedAt: new Date()}
]

const places = [
  { id: createUUID(), name: 'Parque Estadual do Ibicatu', createdAt: new Date() },
  { id: createUUID(), name: 'Parque Estadual Mata dos Godoy', createdAt: new Date()},
  { id: createUUID(), name: 'Parque Estadual Mata São Francisco', createdAt: new Date()},
  { id: createUUID(), name: 'Fazenda Alvorada', createdAt: new Date()},
  { id: createUUID(), name: 'Fazenda Santo Antônio', createdAt: new Date()},
  { id: createUUID(), name: 'Fazenda Congonhas', createdAt: new Date()},
  { id: createUUID(), name: 'Fazenda Bule', createdAt: new Date()},
  { id: createUUID(), name: 'Fazenda Colorado', createdAt: new Date() },
  { id: createUUID(), name: 'Parque Nacional Iguazú', createdAt: new Date()},
];

export async function seedDatabase() {
  const count = await prisma.animal.count();

  const existingGroups = await prisma.animalList.findMany({
  where: {
    name: { in: DEFAULT_GROUPS.map(g => g.name) }
  },
  select: { name: true }
});
  console.log(existingGroups.length)
  //if (existingGroups.length < 5) {
    console.log("🌱 Populando banco de dados com animais padrão...");
    await prisma.animal.createMany({
      data: DEFAULT_ANIMALS
    });

    console.log("Populando o banco de dados com as Listas de Animais...");
    await prisma.animalList.createMany({
        data: DEFAULT_GROUPS
    });

    const allAnimals = await prisma.animal.findMany();
    const allGroups = await prisma.animalList.findMany();

    // 3. Criar os relacionamentos baseados nos nomes
    console.log("🔗 Gerando relacionamentos AnimalMember...");

    const relations = [
      { animalName: 'Subulo gouazoubira', groupName: 'Artiodactyla' },
      { animalName: 'Sus scrofa', groupName: 'Artiodactyla'},
      { animalName: 'Dicotyles tajacu', groupName: 'Artiodactyla'},
      { animalName: 'Bos taurus', groupName: 'Artiodactyla'},
      { animalName: 'Cerdocyon thous', groupName: 'Carnivora'},
      { animalName: 'Leopardus guttulus', groupName: 'Carnivora'},
      { animalName: 'Leopardus pardalis', groupName: 'Carnivora' },
      { animalName: 'Leopardus wiedii', groupName: 'Carnivora'},
      { animalName: 'Puma concolor', groupName: 'Carnivora'},
      { animalName: 'Herpailurus yagouaroundi', groupName: 'Carnivora'},
      { animalName: 'Eira barbara', groupName: 'Carnivora'},
      { animalName: 'Canis familiaris', groupName: 'Carnivora'},
      { animalName: 'Nasua nasua', groupName: 'Carnivora'},
      { animalName: 'Procyon cancrivorus', groupName: 'Carnivora'},
      { animalName: 'Dasypus novemcinctus', groupName: 'Cingulata'},
      { animalName: 'Euphractus sexcinctus', groupName: 'Cingulata'},
      { animalName: 'Cabasous tatouay', groupName: 'Cingulata'},
      { animalName: 'Didelphis albiventris', groupName: 'Didelphimorphia'},
      { animalName: 'Didelphis aurita', groupName: 'Didelphimorphia'},
      { animalName: 'Tapirus terrestris', groupName: 'Perissodactyla'},
      { animalName: 'Tamandua tetradactyla', groupName: 'Pilosa'},
      { animalName: 'Alouatta Guariba', groupName: 'Primates'},
      { animalName: 'Sapajus nigritus', groupName: 'Primates'},
      { animalName: 'Hydrochoerus hydrochaeris', groupName: 'Rodentia'},
      { animalName: 'Cuniculus paca', groupName: 'Rodentia'},
      { animalName: 'Dasyprocta azarae', groupName: 'Rodentia'},
      { animalName: 'Coendou spinosus', groupName: 'Rodentia'},
      { animalName: 'Lepus europaeus', groupName: 'Lagomorpha'},
      { animalName: 'Sylvilagus minensis', groupName: 'Lagomorpha'},
    ];

    const animalMemberData = relations.map(rel => {
      const animal = allAnimals.find(a => a.name.trim() === rel.animalName);
      const group = allGroups.find(g => g.name.trim() === rel.groupName);

      if (animal && group) {
        return {
          id: createUUID(),
          animalId: animal.id,
          animalListId: group.id
        };
      }
      return null;
    }).filter(Boolean);

    await prisma.animalMember.createMany({
      data: animalMemberData as any
    });

    console.log("🌱 Populando banco de dados com lugares padrão...");
    await prisma.place.createMany({
      data: places
    });    

    console.log("✅ Banco populado e relacionado com sucesso!");
  }
//}