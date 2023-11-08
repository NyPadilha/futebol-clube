import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/matches.model';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  public async getMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.getMatches();
    return { status: 200, data: matches };
  }

  public async getMatchById(id: string): Promise<ServiceResponse<IMatch | null>> {
    const match = await this.matchModel.getMatchById(id);
    return { status: 200, data: match };
  }
}
