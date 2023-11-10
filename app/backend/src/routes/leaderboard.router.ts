import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardRouter = new LeaderboardController();

router.get('/home', (req: Request, res: Response) => leaderboardRouter.getLeaderboard(req, res));

export default router;
