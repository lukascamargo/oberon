import { getModelForClass } from '@typegoose/typegoose';
import * as dotenv from 'dotenv';
import { IUser, IUserLogin, IUserRegister, UserSchema } from '../../../schema/user';
import { LoginService } from '../../../service/user/LoginService';
import { UserService } from '../../../service/user/UserService';
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

describe('Unit test for the Login function', () => {
    let userService: UserService;
    let loginService: LoginService;
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

    beforeAll(async () => {
        userService = new UserService();
        loginService = new LoginService();
    });

    it('should not login before creating an user', async () => {
        const session = loginService.session(userToLogin);

        expect(session).toContain({email: userToLogin.email});
    });

    it('should create an user before doing the login', async () => {
        expect(true).toBe(true);
    });

    it('should login with the created user', async () => {
        expect(true).toBe(true);
    });
});
