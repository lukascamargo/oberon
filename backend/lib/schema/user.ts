import { pre, prop } from '@typegoose/typegoose';
import * as crypto from 'crypto';

interface IUser {
    __v?: number;
    _id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName: string;
    isTrainer: boolean;
    active: boolean;
}

interface IUserLogin {
    email: string;
    password: string;
}

// tslint:disable-next-line: no-empty-interface
interface IUserRegister extends IUser {}
@pre<UserSchema>('findOneAndUpdate', function(next) {
    const password = crypto.pbkdf2Sync(this.getUpdate().password + this.getUpdate().email, process.env.hash, 1000, 64, 'sha512').toString('base64');
    this.getUpdate().password = password;
    next();
})
class UserSchema {
    @prop({required: true})
    email: string;

    @prop({required: true})
    password: string;

    @prop({required: true})
    firstName: string;

    @prop({required: true})
    lastName: string;

    @prop({required: true})
    displayName: string;

    @prop()
    isTrainer: boolean;

    @prop({required: true})
    active: boolean;
}

export {
    IUser,
    IUserLogin,
    IUserRegister,
    UserSchema,
};
