import { Request, Response, Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidations from '../validations/login.schema';

const router = Router();

const loginController = new LoginController();

router.post(
  '/',
  loginValidations.bodyValidation,
  loginValidations.fieldsValidation,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
