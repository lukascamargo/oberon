import { getModelForClass } from '@typegoose/typegoose';
import * as dotenv from 'dotenv';
import * as request from 'supertest';
import app from '../../../config/app';
import { IUser, IUserRegister, UserSchema } from '../../../schema/user';
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

describe('Integration test at Users Controller', () => {
    const user: IUserRegister = {
        email: 'lukas.fialho@gmail.com',
        password: 'senha',
        firstName: 'Lukas',
        lastName: 'Fialho',
        displayName: 'Lukas Fialho',
        isTrainer: false,
        active: true,
    };

    it('should create an user', async (done) => {
        request(app)
            .post('/user/store')
            .send(user)
            .expect(200, done);
    });

    it('shouldnt receive 200 when creating an user', async (done) => {
        request(app)
            .post('/user/store')
            .expect(400, done);
    });

    it('shouldnt receive 200 when creating an user because it is missing several properties', async (done) => {
        request(app)
            .post('/user/store')
            .send({status: 'teste'})
            .expect(400, done);
    });

    // it('should bring the user created in the first test', async (done) => {
    //     request(app)
    //         .get('/user/index')
    //         .expect(200);
    //         // .end((error, response) => {
    //         //     if (error) { return done(error); }

    //         //     expect(response.body[0].email).toEqual('lukas.fialho@gmail.com');
    //         // });
    // });
    it('should bring all the users', async (done) => {
        request(app)
            .get('/user/index')
            .expect(200, done)
            .end((error, response) => {
                if (error) { return done(error); }
                const resposta = JSON.stringify(response);
                console.log(resposta);
                expect(resposta).toEqual('lukas.fialho@gmail.com');
            });
    });

});
