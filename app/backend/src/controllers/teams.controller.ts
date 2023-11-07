import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamsController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamService.getAllTeams();
    res.status(status).json(data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getTeamById(id);
    res.status(status).json(data);
  }
}
