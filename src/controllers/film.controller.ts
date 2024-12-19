import { Request, Response } from 'express';
import { fetchFilms } from '../queries/film.queries';
import { produceWhereObject } from '../queries/helpers/produceWhereObject';

export const getAllFilms = async (req: Request, res: Response) => {
  try {
    const where = produceWhereObject(req);

    console.log(where);

    const films = await fetchFilms(where);
    res.json(films);
  } catch (error) {
    console.error('Error fetching films', error);
    res.status(500).json({ error: 'Failed to fetch films' });
  }
};
