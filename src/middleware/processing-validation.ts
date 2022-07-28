import { Request, Response, NextFunction } from 'express';
import { query, validationResult } from 'express-validator';

const validate = [
  query('name').exists().withMessage('Name is not exist'),
  query('width')
    .exists()
    .isInt({ min: 1 })
    .withMessage('width must be positive number greater than 0'),
  query('height')
    .exists()
    .isInt({ min: 1 })
    .withMessage('Height must be positive number greater than 0'),
  function (request: Request, response: Response, next: NextFunction) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validate;
