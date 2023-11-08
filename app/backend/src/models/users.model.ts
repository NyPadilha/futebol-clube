import { IUser } from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel {
  private model = SequelizeUser;

  public async login(email: string): Promise<IUser | null> {
    return this.model.findOne({ where: { email } });
  }
}
