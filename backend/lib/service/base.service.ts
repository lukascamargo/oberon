import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';

export class BaseService<T>  {
    protected _model: ModelType<T>;

    index = async (filter = {}, exclude = {}) => {
        return await this._model.find(filter, exclude).exec();
    }

    update = async (filter = {}, item, populate = []) => {
        return (await this._model.findOneAndUpdate(filter, item, {new: true, upsert: true})).populate(populate);
    }

    delete = async (filter = {}) => {
        return await this._model.findByIdAndRemove(filter);
    }

    toObjectId = async (id: string | any) => {
        return Types.ObjectId(id);
    }
}
