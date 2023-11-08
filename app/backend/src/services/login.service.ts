import { compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import UserModel from '../models/users.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUser, IRole } from '../Interfaces/users/IUser';

const generateToken = (email: string): string =>
  sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

export const verifyToken = (token: string): string | null => {
  try {
    const { email } = verify(token, process.env.JWT_SECRET || 'secret') as { email: string };
    return email;
  } catch (err) {
    return null;
  }
};

export default class LoginService {
  constructor(
    private userModel = new UserModel(),
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<string>> {
    const user = await this.userModel.login(email);

    const validCredentials = user && compareSync(password, user.password);
    if (!validCredentials) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const token = generateToken(email);

    return { status: 200, data: token };
  }

  public async getRole(token: string): Promise<ServiceResponse<IRole>> {
    const email = verifyToken(token) as string;

    const user = await this.userModel.getRole(email) as IUser;

    return { status: 200, data: { role: user.role } };
  }
}
