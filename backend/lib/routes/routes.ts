import { Router } from 'express';

export abstract class Routes {

    public router: Router;

    constructor() {
        this.router = Router();
        this._init();
    }

    protected _init() { /* You should implement your routes here */  }

}
