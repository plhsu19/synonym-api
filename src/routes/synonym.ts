import express from 'express';
import { getSynonyms, addSynonyms } from '../controllers/synonymControllers.js';
import { validateAddSynonymsReuqestBody, validateGetSynonymParameter } from '../middlewares/synonymMiddlewares.js';

const router = express.Router();

// GET /synonyms/{word}
router.get('/:word', validateGetSynonymParameter, getSynonyms);

// POST /synonyms
router.post('/', validateAddSynonymsReuqestBody, addSynonyms);

export default router;
