import { UserController } from '@controller/user.controller';
import { Routes } from '@routes/routes';

class UserRoutes extends Routes {

    private _controller: UserController = new UserController();

    /*
        It is needed to call init in the child constructor,
        because if it is called in the father constructor
        the controller variable will be undefined
     */
    constructor() {
        super();
        this.init();
    }

    init() {
        this.router
            .route('/store')
            .post(this._controller.store.bind(this._controller));
    }
}

export default new UserRoutes().router;
