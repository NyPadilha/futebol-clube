import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/teams/ITeam';
import TeamModel from '../models/teams.model';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.getAllTeams();
    return { status: 200, data: teams };
  }

  public async getTeamById(id: string): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.getTeamById(id);
    return { status: 200, data: team };
  }
}
