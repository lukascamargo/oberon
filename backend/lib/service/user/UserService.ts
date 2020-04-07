import { IUserRegister, UserSchema } from '@schema/user';
import { getModelForClass } from '@typegoose/typegoose';

export class UserService {

    constructor(
        private readonly _userschema = getModelForClass(UserSchema),
    ) { }

    index = async () => {
        return await this._userschema.find({active: true});
    }

    update = async (user: IUserRegister) => {
        if (!user) {
            throw new Error('It is missing values');
        }
        const response = await this._userschema.findOneAndUpdate(
            {email: user.email},
            user,
            {upsert: true, new: true},
        );

        if (!response) {
            throw new Error('Database error');
        }

        return response;
    }

    delete = async (userId: string) => {
        return await this._userschema.findByIdAndRemove(userId);
    }

}
