import { stub, restore } from 'sinon';
import { use, expect, request } from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { 
    allTeams,
    teamById,
} from './mocks/team.mock';

use(chaiHttp);

describe('Test Teams', () => {
    beforeEach(() => {
        restore();
    });

    it('should get all teams', async () => {
        stub(SequelizeTeam, 'findAll').resolves(allTeams as any);
        
        const result = await request(app).get('/teams');

        expect(result.status).to.be.eq(200);
        expect(result.body).to.be.deep.eq(allTeams);
    });

    it('should get a team by id', async () => {
        stub(SequelizeTeam, 'findByPk').resolves(teamById as any);

        const result = await request(app).get('/teams/3');

        expect(result.status).to.be.eq(200);
        expect(result.body).to.be.deep.eq(teamById);
        
    });

    it('if team couldnt find the team, should return not found', async () => {
        stub(SequelizeTeam, 'findByPk').resolves(null);

        const result = await request(app).get('/teams/4');

        expect(result.status).to.be.eq(404);
        expect(result.body).to.be.deep.eq({
            message: 'team not found',
        });
    });
});
