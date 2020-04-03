import app from '@config/app';
import * as request from 'supertest';

describe('It is going to test testing suites', async () => {
    it('should get the isAlive response', async (done) => {
        request(app)
            .get('/isAlive')
            .expect(200, done);
    });
});
