import * as request from 'supertest';
import app from '../../config/app';

describe('It is going to test testing suites', () => {

    it('should get the isAlive response', async () => {
        request(app)
            .get('/isAlive')
            .expect(200);
    });

});
