import { Request, Response, NextFunction } from 'express';
import { synonymsMap } from '../controllers/synonymControllers.js';

const MISSIGN_PARAMETER_ERROR_MESSAGE =
  'Missing synonym(s) parameter in the request body';
const INVALID_PARAMETER_TYPE_ERROR_MESSAGE =
  'Synonym parameter should be string';
const INVALID_PARAMETER_ERROR_MESSAGE =
  'Word or synoym could not be empty or contains only numbers and spaces';
const SYNONYMS_NOT_FOUND_ERROR_MESSAGE =
  'No synonyms found for the word: ';
const GENERAL_BAD_REQUEST_ERROR_MESSAGE =
  'Please check the request and the parameter(s) provided';

const validateGetSynonymParameter = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const word: string = req.params.word;
  try {
    if (!isValidFormat(word)) {
      return res.status(400).json({
        errorMessage: INVALID_PARAMETER_ERROR_MESSAGE,
      });
    }
    if (!synonymsMap.has(word)) {
      return res.status(404).json({
        errorMessage: SYNONYMS_NOT_FOUND_ERROR_MESSAGE + word,
      });
    }
  } catch (e) {
    return res.status(400).json({
      errorMessage: GENERAL_BAD_REQUEST_ERROR_MESSAGE,
    });
  }
  next();
};

const validateAddSynonymsReuqestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const synonym1: string = req.body.synonym1;
  const synonym2: string = req.body.synonym2;

  try {
    if (synonym1 == null || synonym2 == null) {
      return res.status(400).json({
        errorMessage: MISSIGN_PARAMETER_ERROR_MESSAGE,
      });
    }
    if (typeof synonym1 !== 'string' || typeof synonym2 !== 'string') {
      return res.status(400).json({
        errorMessage: INVALID_PARAMETER_TYPE_ERROR_MESSAGE,
      });
    }
    if (!isValidFormat(synonym1) || !isValidFormat(synonym2)) {
      return res.status(400).json({
        errorMessage: INVALID_PARAMETER_ERROR_MESSAGE,
      });
    }
  } catch (e) {
    return res.status(400).json({
      errorMessage: GENERAL_BAD_REQUEST_ERROR_MESSAGE,
    });
  }
  next();
};

const isValidFormat = (word: string): boolean => {
  const regexPattern = /^[\d\s]*$/;
  return !regexPattern.test(word);
};

export { validateAddSynonymsReuqestBody, validateGetSynonymParameter };
