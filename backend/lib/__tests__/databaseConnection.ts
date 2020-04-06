import {MongoMemoryServer} from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

class DatabaseConnection {
    mongod;

    constructor() {
        this.connectDatabase();
    }

    // tslint:disable-next-line: align
    connectDatabase = async () => {
        this.mongod = new MongoMemoryServer();
        const mongoUri = await this.mongod.getUri();
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
        }, (err) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
        });
        return this.mongod;
    }

    disconnect = async () => {
        await mongoose.disconnect();
    }

}

export default new DatabaseConnection();
