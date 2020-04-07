import { Controller } from '@decorators/express';
import { UserService } from '@service/user/UserService';
import { Request, Response } from 'express';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';

@ApiPath({
    path: '/user',
    name: 'User',
})
@Controller('User')
export class UserController {
    constructor(
        private _userService = new UserService(),
    ) { }

    public index(req: Request, res: Response) {
        this._userService.index()
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    public store(req: Request, res: Response) {
        this._userService.update(req.body)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    public update(req: Request, res: Response) {
        this._userService.update(req.body)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    public delete(req: Request, res: Response) {
        this._userService.delete(req.params.id)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    }

}
