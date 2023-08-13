import { Request, Response } from 'express';

// data structure to store synonyms
const synonymsMap: Map<string, Set<string>> = new Map();

const INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE =
  'Something went wrong, please try again later or contact support.';

const getSynonyms = (req: Request, res: Response): void => {
  const word: string = req.params.word;
  try {
    const synonyms = [...synonymsMap.get(word)];
    res.status(200).json({
      synonyms: synonyms,
    });
  } catch (e) {
    res.status(500).json({
      message: INTERNAL_SYSTEM_FAILURE_ERROR_MESSAGE,
    });
  }
};

const addSynonyms = (req: Request, res: Response): void => {
  const synonym1 = req.body.synonym1;
  const synonym2 = req.body.synonym2;
  try {
    addSynonymPair(synonym1, synonym2);
    addSynonymPair(synonym2, synonym1);
    console.log(synonymsMap);
    res.status(201).json({
      success: true,
      synonymPair: [synonym1, synonym2],
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
