import { UserSchema, IUserRegister } from '@schema/user';
import { getModelForClass } from '@typegoose/typegoose';

export class UserService {

    constructor(
        private _userschema = getModelForClass(UserSchema),
    ) { }

    index = async () => {

    }

    store = async (user: IUserRegister) => {
        return await this._userschema.findOneAndUpdate(
            {email: user.email},
            user,
            {upsert: true, new: true},
        );
    }

    update = async () => {

    }

    delete = async () => {

    }

}