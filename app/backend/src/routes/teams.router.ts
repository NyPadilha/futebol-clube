import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();

const teamsController = new TeamsController();

router.get('/', (_req: Request, res: Response) => teamsController.getAllTeams(_req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default router;
