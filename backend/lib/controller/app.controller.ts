import { Controller } from '@decorators/express';
import { Request, Response } from 'express';
import { ApiPath } from 'swagger-express-ts';

@ApiPath({
    path: '',
    name: 'App',
})
@Controller('App')
export class AppController {
    constructor() { }

    public isAlive(req: Request, res: Response) {
        res.json({
            message: 'Is Alive',
            env: process.env.NODE_ENV,
        });
    }
}
