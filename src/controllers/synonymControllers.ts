import { Request, Response } from 'express';

const getSynonyms = (req: Request, res: Response): void => {
  const word = req.params.word;
  res.status(200).json({
    message: `get endpoint with path parameter ${word}`,
  });
};

const addSynonyms = (req: Request, res: Response):void => {
  console.log(req.body.synonyms);
  res.status(200).json({
    message: 'post endpoint',
  });
}

export { getSynonyms, addSynonyms };
