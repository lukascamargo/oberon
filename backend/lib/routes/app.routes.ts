import { AppController } from '@controller/app.controller';
import { Routes } from '@routes/routes';

class AppRoutes extends Routes {

    private _appController: AppController = new AppController();

    constructor() {
        super();
    }

    init() {
        this.router
            .route('/isAlive')
            .get(this._appController.isAlive.bind(this._appController));
    }
}

export default new AppRoutes().router;
