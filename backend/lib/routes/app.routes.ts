import {Routes} from '@routes/routes';

class AppRoutes extends Routes {

    constructor() {
        super();
    }

    protected _init() {
        this.router
            .route('/isAlive')
                .get((req, res) => {
                    res.json({
                    message: 'Is Alive',
                });
        });
    }
}

export default new AppRoutes().router;
