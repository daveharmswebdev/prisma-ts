import { Request } from 'express';
import { Prisma } from '@prisma/client';

export const produceWhereObject = (req: Request): Prisma.filmWhereInput => {
  const where: any = {};
  const { title, description, year, year_end, year_verb, rating } = req.query;

  if (title) {
    where.title = { contains: title, mode: 'insensitive' };
  }

  if (description) {
    where.description = { contains: description, mode: 'insensitive' };
  }

  if (year && year_verb === 'equals') {
    where.release_year = { equals: +year };
  }

  if (year && year_verb === 'after') {
    where.release_year = { gte: +year };
  }

  if (year && year_verb === 'before') {
    where.release_year = { lte: +year };
  }

  if (year && year_end && year_verb === 'between') {
    where.release_year = { in: [+year, +year_end] };
  }

  if (rating) {
    where.rating = { equals: rating };
  }

  return where;
};
