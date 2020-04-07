import { Controller } from '@decorators/express';
import { UserService } from '@service/user/UserService';
import { Request, Response } from 'express';
import { ApiPath } from 'swagger-express-ts';

@ApiPath({
    path: '/login',
    name: 'Login',
})
@Controller('Login')
export class LoginController { }
