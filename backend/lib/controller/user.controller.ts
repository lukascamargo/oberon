import { Controller } from '@decorators/express';
import { UserService } from '@service/user/user.service';
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

    public store(req: Request, res: Response) {
        this._userService.store(req.body)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                res.json(error);
            });
    }
}
