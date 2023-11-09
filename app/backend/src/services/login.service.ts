import { compareSync } from 'bcryptjs';
import UserModel from '../models/users.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IRole } from '../Interfaces/users/IUser';
import { generateToken, verifyToken } from '../utils/jwt.utils';
import { IToken } from '../Interfaces/Token';

export default class LoginService {
  constructor(
    private userModel = new UserModel(),
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.login(email);

    const validCredentials = user && compareSync(password, user.password);
    if (!validCredentials) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const token = generateToken(email);

    return { status: 200, data: { token } };
  }

  public async getRole(token: string): Promise<ServiceResponse<IRole>> {
    const email = verifyToken(token) as string;

    const user = await this.userModel.getRole(email);

    return { status: 200, data: { role: user?.role || null } };
  }
}
