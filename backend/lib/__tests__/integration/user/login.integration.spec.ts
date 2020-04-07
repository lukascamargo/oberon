import { getModelForClass } from '@typegoose/typegoose';
import * as dotenv from 'dotenv';
import * as request from 'supertest';
import app from '../../../config/app';
import { IUser, IUserLogin, IUserRegister, UserSchema } from '../../../schema/user';
import databaseConnection from '../../databaseConnection';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
let mongod;

beforeAll(() => {
    dotenv.config();
});

beforeAll(async () => {
    mongod = await databaseConnection.mongod;
});

afterAll(async () => {
    const userSchema = getModelForClass(UserSchema);
    userSchema.deleteMany({});
    await databaseConnection.disconnect();
    await mongod.stop();
});

describe('Integration test at Login Controller to simulate the login route', () => {
    const user: IUserRegister = {
        email: 'lukas.fialho@gmail.com',
        password: 'senha',
        firstName: 'Lukas',
        lastName: 'Fialho',
        displayName: 'Lukas Fialho',
        isTrainer: false,
        active: true,
    };

    const userToLogin: IUserLogin = {
        email: 'lukas.fialho@gmail.com',
        password: 'senha',
    };

    it('should not login before creating an user', async (done) => {
        request(app)
            .post('/login/session')
            .send(userToLogin)
            .expect(401, done);
    });

    it('should create an user before doing the login', async (done) => {
        request(app)
            .post('/user/create')
            .send(user)
            .expect(200, done);
    });

    it('should login with the created user', async (done) => {
        request(app)
            .post('/login/session')
            .send(userToLogin)
            .expect(200, done);
    });
});
