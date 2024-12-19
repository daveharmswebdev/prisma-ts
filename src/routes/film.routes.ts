import { Router } from 'express';
import { getAllFilms } from '../controllers/film.controller';

const router = Router();

router.get('/', getAllFilms);

export default router;
