import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch, MatchStatus } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/matches.model';
import TeamModel from '../models/teams.model';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  public async getMatches(matchStatus: MatchStatus): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.getMatches(matchStatus);
    return { status: 200, data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<void>> {
    await this.matchModel.finishMatch(id);
    return { status: 200, data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<void>> {
    await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 200, data: { message: 'Updated' } };
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch>> {
    const homeTeamExists = await new TeamModel().getTeamById(homeTeamId);
    const awayTeamExists = await new TeamModel().getTeamById(awayTeamId);

    if (!homeTeamExists || !awayTeamExists) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }

    const match = await this.matchModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return { status: 201, data: match };
  }
}
