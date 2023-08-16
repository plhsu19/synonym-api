import { Request, Response } from 'express';
import { SynonymsMap, SynonymsSet } from '../types/synonymsTypes.js';
import { Dfs } from '../helpers/synonymHelpers.js';
import mockSynonymsMap from '../data/mockSynonymsMap.js';

const INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE =
  'Something went wrong, please try again later or contact support.';

let synonymsMap: SynonymsMap = new Map();
// use mockSynonymsMap for development
if (process.env.NODE_ENV === 'development') synonymsMap = mockSynonymsMap;

const getSynonyms = (req: Request, res: Response): void => {
  const word: string = req.params.word;
  try {
    // Object DFS search
    const dfs = new Dfs();
    const synonyms: SynonymsSet = dfs.getSynonymsResult(word, synonymsMap);

    // functional DFS search
    // const synonyms = functionalSearch(word, synonymsMap, new Set());
    
    synonyms.delete(word);

    res.status(200).json({
      word: word,
      number: synonyms.size,
      synonyms: [...synonyms],
    });
  } catch (e) {
    res.status(500).json({
      message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
    });
  }
};

const addSynonyms = (req: Request, res: Response): void => {
  const word = req.body.word;
  const synonym = req.body.synonym;
  try {
    addSynonymPair(word, synonym);
    addSynonymPair(synonym, word);
    res.status(201).json({
      word: word,
      synonym: synonym,
    });
  } catch (e) {
    res.status(500).json({
      message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
    });
  }
};

const addSynonymPair = (synonym1: string, synonym2: string): void => {
  if (synonymsMap.has(synonym1)) {
    synonymsMap.get(synonym1).add(synonym2);
  } else {
    synonymsMap.set(synonym1, new Set([synonym2]));
  }
};

export { getSynonyms, addSynonyms, synonymsMap };
