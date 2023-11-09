import { ITeam } from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel {
  private model = SequelizeTeam;

  public async getAllTeams(): Promise<ITeam[]> {
    return this.model.findAll();
  }

  public async getTeamById(id: number): Promise<ITeam | null> {
    return this.model.findByPk(id);
  }
}
