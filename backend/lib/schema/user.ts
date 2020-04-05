import { prop } from '@typegoose/typegoose';

interface IUser {
    __v?: number;
    _id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName: string;
    isTrainer: boolean;
}

interface IUserLogin {
    email: string;
    password: string;
}

// tslint:disable-next-line: no-empty-interface
interface IUserRegister extends IUser {}

class UserSchema {
    @prop()
    email: string;

    @prop()
    password: string;
    @prop()
    firstName: string;

    @prop()
    lastName: string;

    @prop()
    displayName: string;

    @prop()
    isTrainer: boolean;
}

export {
    IUser,
    IUserLogin,
    IUserRegister,
    UserSchema,
};
