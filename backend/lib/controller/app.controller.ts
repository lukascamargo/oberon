import { Controller } from '@decorators/express';
import { Request, Response } from 'express';
import { ApiOperationGet, ApiPath } from 'swagger-express-ts';

@ApiPath({
    path: '',
    name: 'App',
})
@Controller('App')
export class AppController {
    constructor() { }

    @ApiOperationGet({
        description: 'This route will check is the record service is alive',
        summary: 'Is Alive Route',
        path: '/isAlive',
        responses: {
            200: {description: 'The service is alive'},
            500: {description: 'The service is not alive'},
        },
    })
    public isAlive(req: Request, res: Response) {
        res.json({
            message: 'Is Alive',
            env: process.env.NODE_ENV,
        });
    }
}
