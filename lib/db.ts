import { PrismaClient } from '@prisma/client'

/* NORMAL Prisma Init According to the docs */
// use `prisma` in your application to read and write data in your DB
// const prisma = new PrismaClient()
// export default prisma

/**
* ! Hack STOPS REPEATED RELOADING of PrismaClient()
**/
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}