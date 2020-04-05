process.env.NODE_ENV = 'TEST';
import {Mockgoose} from 'mockgoose';
import * as mongoose from 'mongoose';

export class DatabaseConnection {
    mongo_uri = process.env.DB_URI as string;

    mockSetup(): void { 
        const mockgoose = new Mockgoose(mongoose);

        mockgoose.prepareStorage()
            .then(() => {
                this.mongoSetup();
            });
    }

    mongoSetup(): void {
        (mongoose as any).Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.connect(this.mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
        mongoose.connection.on('connected', () => console.log('Connected with MongoDB'));
        mongoose.connection.on('error', (error) => console.log('Error on connection. ' + error));
        mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('connection with MongoDB closed.');
                process.exit(0);
            });
        });
    }

    mongoClose(): void {
        mongoose.disconnect();
    }

}
