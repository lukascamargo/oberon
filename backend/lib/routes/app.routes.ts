import { AppController } from '@controller/AppController';
import { Routes } from '@routes/routes';

class AppRoutes extends Routes {

    private _controller: AppController = new AppController();

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
            .route('/isAlive')
            .get(this._controller.isAlive.bind(this._controller));
    }
}

export default new AppRoutes().router;
