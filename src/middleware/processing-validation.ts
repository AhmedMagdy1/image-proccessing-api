import { Request, Response, NextFunction } from "express";
import { check, body , query ,oneOf, validationResult } from 'express-validator';

const validate =  [
    query('name').exists().withMessage('Name is not exist'),
    query('width').exists().isInt({ min:1 }).withMessage('width must be number greater than 0'),
    query('height').exists().isInt({ min:1 }).withMessage('Height must be number greater than 0'),
    function(request: Request, response: Response, next: NextFunction) { 
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
        next();
    },
];

export default validate;
