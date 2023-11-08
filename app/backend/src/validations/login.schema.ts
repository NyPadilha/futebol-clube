import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default class loginValidations {
  static bodyValidation(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }

  static fieldsValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const schema = joi.string().email();
    const { error } = schema.validate(email);

    if (error || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
