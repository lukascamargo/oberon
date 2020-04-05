import { getModelForClass } from '@typegoose/typegoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { IUser, IUserRegister, UserSchema } from '../../../schema/user';
import {UserService} from '../../../service/user/user.service';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
let mongod;

beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const mongoUri = await mongod.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
    }, (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
});

afterAll(async () => {
    const userSchema = getModelForClass(UserSchema);
    await userSchema.deleteMany({});
    await mongoose.disconnect();
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

        const {email, password, firstName, lastName, displayName, isTrainer} = await userService.store(user);

        expect({email, password, firstName, lastName, displayName, isTrainer}).toEqual(user);

    });

    it('should retrieve the user created in the first test', async () => {
        const index: IUser[] = await userService.index();

        expect(index[0].email).toBe(user.email);

    });

    it('should update the user created in the first test', async () => {
        user.lastName = 'Camargo';
        const store: IUser = await userService.store(user);

        expect(store.lastName).toBe(user.lastName);
    });

    it('should inactivate the user created in the first test', async () => {
        user.active = false;
        const inactivate: IUser[] = await userService.store(user);

        expect(inactivate.active).toBe(user.active);
    });

    it('should not bring any users since in the last test we inactivated the user created in first test', async () => {
        const index: IUser[] = await userService.index();

        expect(index).toBe([]);
    });

    it('should delete from the database an user by id', async () => {
        const deleteUser = await userService.delete(user._id);

        expect(deleteUser).toBe(true);
    });
});
