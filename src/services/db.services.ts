import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const dbConnect = async () => {
  try {
    await prisma.$connect();
    //eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export { dbConnect, prisma };
