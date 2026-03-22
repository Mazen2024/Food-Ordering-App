import { Environments } from "@/contants/enums";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    log : process.env.NODE_ENV === Environments.DEV ? ['query', 'error', 'warn'] : ['error'],
});

export const prismaObj = new PrismaClient({ adapter  });