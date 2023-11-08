import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel {
  private model = SequelizeMatch;

  public async getMatches(): Promise<IMatch[]> {
    return this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }

  public async getMatchById(id: string): Promise<IMatch | null> {
    return this.model.findByPk(id);
  }
}
