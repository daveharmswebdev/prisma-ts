import prisma from '../libs/prisma';
import { Prisma } from '@prisma/client';

export const fetchFilms = async (where: Prisma.filmWhereInput) =>
  prisma.film.findMany({ where });
