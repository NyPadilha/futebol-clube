import { Request, Response, Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidations from '../validations/login.schema';
import tokenValidations from '../validations/token.validation';

const router = Router();

const loginController = new LoginController();

router.post(
  '/',
  loginValidations.bodyValidation,
  loginValidations.fieldsValidation,
  (req: Request, res: Response) => loginController.login(req, res),
);
router.get(
  '/role',
  tokenValidations.validate,
  (req: Request, res: Response) => loginController.getRole(req, res),
);

export default router;
