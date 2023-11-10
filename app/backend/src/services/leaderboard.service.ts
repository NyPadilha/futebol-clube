import LeaderboardModel from '../models/leaderboard.model';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) {}

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getLeaderboard();
    return { status: 200, data: leaderboard };
  }
}
