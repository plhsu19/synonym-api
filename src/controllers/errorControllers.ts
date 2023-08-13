import { Request, Response } from 'express';

const routeNotFound = (req: Request, res: Response): void => {
  const path = req.path;
  const method = req.method;
  res.status(404).json({
    errorMessage: `Endpoint with method ${method} and path ${path} is not found.`,
  });
};

export { routeNotFound };
