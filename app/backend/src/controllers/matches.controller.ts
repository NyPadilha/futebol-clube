import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matchStatus = inProgress ? { inProgress: inProgress === 'true' } : {};
    const { status, data } = await this.matchService.getMatches(matchStatus);
    res.status(status).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    res.status(status).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const {
      status,
      data,
    } = await this.matchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(status).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const {
      status,
      data,
    } = await this.matchService.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(status).json(data);
  }
}
