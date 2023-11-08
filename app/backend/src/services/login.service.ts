import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserModel from '../models/users.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

const generateToken = (email: string): string =>
  sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

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
}
