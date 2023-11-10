import { QueryTypes } from 'sequelize';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import query from '../utils/leaderboard.query';
import db from '../database/models';

export default class LeaderboardModel {
  private db = db;

  public async getLeaderboard(): Promise<ILeaderboard[]> {
    const leaderboard = (await this.db.query(query, {
      type: QueryTypes.SELECT,
    }));
    return leaderboard as ILeaderboard[];
  }
}
