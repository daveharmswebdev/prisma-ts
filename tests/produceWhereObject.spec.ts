import { describe, expect, test } from 'vitest';
import { Request } from 'express';
import { produceWhereObject } from '../src/queries/helpers/produceWhereObject';

describe('Produce where object', () => {
  test('should produce where object when title is part of the query', () => {
    const req: Partial<Request> = {
      query: {
        title: 'test',
      },
    };

    const where = produceWhereObject(req as Request);

    const expected = {
      title: {
        contains: 'test',
        mode: 'insensitive',
      },
    };

    expect(where).toStrictEqual(expected);
  });

  test('should produce where object when title and description are part of the query', () => {
    const req: Partial<Request> = {
      query: {
        title: 'test',
        description: 'test_description',
      },
    };

    const where = produceWhereObject(req as Request);

    const expected = {
      title: {
        contains: 'test',
        mode: 'insensitive',
      },
      description: {
        contains: 'test_description',
        mode: 'insensitive',
      },
    };

    expect(where).toStrictEqual(expected);
  });

  test('should be able to generate a search object that searches resource for a specific year', () => {
    const req: Partial<Request> = {
      query: {
        year: '1990',
        year_verb: 'equals',
      },
    };

    const where = produceWhereObject(req as Request);

    const expected = {
      release_year: {
        equals: 1990,
      },
    };

    expect(where).toStrictEqual(expected);
  });

  test('should be able to generate a search object that searches after a specific year', () => {
    const req: Partial<Request> = {
      query: {
        year: '1990',
        year_verb: 'after',
      },
    };

    const where = produceWhereObject(req as Request);

    const expected = {
      release_year: {
        gte: 1990,
      },
    };

    expect(where).toStrictEqual(expected);
  });

  test('should be able to generate a search object that searches before a specific year', () => {
    const req: Partial<Request> = {
      query: {
        year: '1990',
        year_verb: 'before',
      },
    };

    const where = produceWhereObject(req as Request);

    const expected = {
      release_year: {
        lte: 1990,
      },
    };

    expect(where).toStrictEqual(expected);
  });

  test('should be able to generate a search object that searches between years', () => {
    const req: Partial<Request> = {
      query: {
        year: '1990',
        year_end: '2010',
        year_verb: 'between',
      },
    };
    const where = produceWhereObject(req as Request);

    const expected = {
      release_year: {
        in: [1990, 2010],
      },
    };

    expect(where).toStrictEqual(expected);
  });
});
