import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getMatches(_req: Request, res: Response) {
    const { status, data } = await this.matchService.getMatches();
    res.status(status).json(data);
  }

  public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.getMatchById(id);
    res.status(status).json(data);
  }
}
