import { IUserLogin, IUserRegister, UserSchema } from '@schema/user';
import { getModelForClass } from '@typegoose/typegoose';

export class LoginService {
    constructor(
        private readonly _userSchema = getModelForClass(UserSchema)
    ) { }

    session = async (user: IUserLogin) => {
        const [dbUser] = await this._userSchema.find({email: user.email});

        if (!dbUser) {
            throw new Error('Email or Password not found');
        }

        // encrypt password of the user trying to login
        const cryptoPassword = '';

        if (dbUser.password !== cryptoPassword) {
            throw new Error('Email or Password not found');
        }

        return dbUser;

    }
}
