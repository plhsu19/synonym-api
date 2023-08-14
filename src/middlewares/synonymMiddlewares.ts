import { Request, Response, NextFunction } from 'express';
import { synonymsMap } from '../controllers/synonymControllers.js';

const MISSIGN_PARAMETER_ERROR_MESSAGE =
  'Missing word or synonym parameter in the request body';
const INVALID_PARAMETER_TYPE_ERROR_MESSAGE =
  'Word and synonym parameter should be string';
const INVALID_PARAMETER_ERROR_MESSAGE =
  'Word and synonym could not be empty or contains only numbers and spaces';
const INVALID_SYNONYM_ERROR_MESSAGE =
  'Word and synonym could not be the same';
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
  const word: string = req.body.word;
  const synonym: string = req.body.synonym;

  try {
    if (word == null || synonym == null) {
      return res.status(400).json({
        errorMessage: MISSIGN_PARAMETER_ERROR_MESSAGE,
      });
    }
    if (typeof word !== 'string' || typeof synonym !== 'string') {
      return res.status(400).json({
        errorMessage: INVALID_PARAMETER_TYPE_ERROR_MESSAGE,
      });
    }
    if (!isValidFormat(word) || !isValidFormat(synonym)) {
      return res.status(400).json({
        errorMessage: INVALID_PARAMETER_ERROR_MESSAGE,
      });
    }
    if (word === synonym) {
      return res.status(400).json({
        errorMessage: INVALID_SYNONYM_ERROR_MESSAGE,
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
