import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.login(email, password);
    res.status(status).json(data);
  }

  public async getRole(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const token = authorization.split(' ')[1];
    const { status, data } = await this.loginService.getRole(token);
    res.status(status).json(data);
  }
}
