import { Router } from 'express';
import { T } from 'ramda';

// tslint:disable-next-line: no-shadowed-variable
export abstract class Routes {

    public router: Router;

    constructor() {
        this.router = Router();
    }

    protected init() {  /* You should implement your routes here */ }

}
