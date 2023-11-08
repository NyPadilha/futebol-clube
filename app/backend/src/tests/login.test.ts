import { stub, restore } from 'sinon';
import { use, expect, request } from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import {
    returnUser,
} from './mocks/user.mock';
import exp from 'constants';

use(chaiHttp);

describe('Test Teams', () => {
    beforeEach(() => {
        restore();
    });

    it('should return the token', async () => {
        stub(SequelizeUser, 'findOne').resolves(returnUser as any);
        stub(bcrypt, 'compareSync').returns(true);
        stub(jwt, 'sign').returns('token' as any);

        const result = await request(app).post('/login')

        expect(result.status).to.be.eq(200);
        expect(result.body).to.be.deep.eq('token');
    });

    it('should return error message when email or password not provided', async () => {
        const result = await request(app).post('/login').send({});

        expect(result.status).to.be.eq(400);
        expect(result.body).to.be.deep.eq({
            message: 'All fields must be filled',
        });
    });

    it('should return error message when email or password is invalid', async () => {
        const result = await request(app).post('/login').send({
            email: 'jaguara@chagas',
            password: '123',
        });

        expect(result.status).to.be.eq(401);
        expect(result.body).to.be.deep.eq({
            message: 'Invalid email or password',
        });
    });
    
});
