import { UserController } from '@controller/user/UserController';
import { Routes } from '@routes/routes';
import { celebrate, Segments, Joi } from 'celebrate';

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
            .route('/index')
            .get(this._controller.index.bind(this._controller));

        this.router
            .route('/create')
            .post(celebrate({
                [Segments.BODY]: Joi.object().keys({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    displayName: Joi.string().required(),
                    isTrainer: Joi.boolean().required(),
                    active: Joi.boolean().required(),
                }),
            }), this._controller.store.bind(this._controller));

        this.router
            .route('/edit')
            .put(celebrate({
                [Segments.BODY]: Joi.object().keys({
                    email: Joi.string().required(),
                }).unknown(),
            }), this._controller.update.bind(this._controller));

        this.router
            .route('/delete/:id')
            .delete(celebrate({
                [Segments.PARAMS] : {
                    id: Joi.string().required(),
                },
            }), this._controller.delete.bind(this._controller));

    }
}

export default new UserRoutes().router;
