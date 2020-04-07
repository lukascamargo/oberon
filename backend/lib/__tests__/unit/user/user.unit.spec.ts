// tslint:disable-next-line: ordered-imports
import { getModelForClass } from '@typegoose/typegoose';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { IUser, IUserRegister, UserSchema } from '../../../schema/user';
import {UserService} from '../../../service/user/UserService';
import DatabaseConnection from '../../databaseConnection';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
let mongod;

beforeAll(() => {
    dotenv.config();
});

beforeAll(async () => {
    mongod = await DatabaseConnection.mongod;
});

afterAll(async () => {
    const userSchema = getModelForClass(UserSchema);
    await userSchema.deleteMany({});
    await DatabaseConnection.disconnect();
    await mongod.stop();
});

describe('Users CRUD', () => {
    let userService: UserService;
    const user: IUserRegister = {
        email: 'lukas.fialho@gmail.com',
        password: 'senha',
        firstName: 'Lukas',
        lastName: 'Fialho',
        displayName: 'Lukas Fialho',
        isTrainer: false,
        active: true,
    };

    beforeAll(async () => {
        userService = new UserService();
    });

    it('should create an user', async () => {

        const {email, firstName, lastName, displayName, isTrainer, active} = await userService.update(user);

        const expectToBe = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            isTrainer: user.isTrainer,
            active: user.active,
        };

        expect({email, firstName, lastName, displayName, isTrainer, active})
        .toEqual(expectToBe);

    });

    it('should retrieve the user created in the first test', async () => {
        const index: IUser[] = await userService.index();

        expect(index[0].email).toBe(user.email);

    });

    it('should retrieve the same user as the earlier test but now checking if the password is different', async () => {
        const index: IUser[] = await userService.index();

        console.log(JSON.stringify(index[0]));

        expect(index[0].password).not.toEqual(user.password);
    });

    it('should update the user created in the first test', async () => {
        user.lastName = 'Camargo';
        const store: IUser = await userService.update(user);

        expect(store.lastName).toBe(user.lastName);
    });

    it('should inactivate the user created in the first test', async () => {
        user.active = false;
        const inactivate: IUser = await userService.update(user);

        expect(inactivate.active).toBe(user.active);
    });

    it('should not bring any users since in the last test we inactivated the user created in first test', async () => {
        const index: IUser[] = await userService.index();

        expect(index).toEqual([]);
    });

    it('should delete from the database an user by id', async () => {
        const deleteUser = await userService.delete(user._id);

        expect(deleteUser).toEqual(null);
    });
});
