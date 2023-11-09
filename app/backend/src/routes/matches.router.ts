import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import tokenValidation from '../validations/token.validation';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.getMatches(req, res));
router.patch(
  '/:id/finish',
  tokenValidation.validate,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  tokenValidation.validate,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.post(
  '/',
  tokenValidation.validate,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
