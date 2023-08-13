import express from 'express';
import { getSynonyms, addSynonyms } from '../controllers/synonymControllers.js';

const router = express.Router();

// GET /synonyms/{word}
router.get('/:word', getSynonyms);

// POST /synonyms
router.post('/', addSynonyms);

export default router;
