import { mockDeep, DeepMockProxy } from 'vitest-mock-extended';
import prisma from '../../src/libs/prisma'; // Path to your actual Prisma client

// Create a mocked Prisma client
const prismaMock = mockDeep<typeof prisma>();

export default prismaMock;
export type PrismaMock = DeepMockProxy<typeof prisma>;
