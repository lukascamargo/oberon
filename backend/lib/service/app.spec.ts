import {MongoClient} from 'mongodb';
import * as request from 'supertest';
import app from '../config/app';

describe('It is going to test testing suites', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        db = await connection.db(console.log('mock database connected'));
    });

    afterAll(async () => {
        db.collection('test').deleteMany({});
        await connection.close();
    });

    it('should get the isAlive response', async () => {
        request(app)
            .get('/isAlive')
            .expect(200);
    });

    it('should test the mongodb environment', async () => {
        const test = db.collection('test');

        let response = await test.insert({message: 'it works', _id: `1bbcd`});

        const mockTest = await test.findOne({});

        response = response.ops[0];

        expect(response).toEqual(mockTest);
    });
});
