import * as request from 'supertest';
import app from '../config/app';

describe('It is going to test testing suites', async () => {
    it('should get the isAlive response', async (done) => {
        request(app)
            .get('/isAlive')
            .expect(200, done);
    });
});
