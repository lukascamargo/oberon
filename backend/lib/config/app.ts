import { DatabaseConnection } from '@config/database';
import AppRoutes from '@routes/app.routes';
import UserRoutes from '@routes/user.routes';
import * as bodyParser from 'body-parser';
import { errors } from 'celebrate';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';
import * as swagger from 'swagger-express-ts';
/**
 * This is a main App config
 */
class App {
    /** Create public app to receive Express Application */
    public app: express.Application;
    databaseConnection: DatabaseConnection;
    mongo_uri = '';

    /** In constructor, are called all methods */
    constructor() {
        this.app = express();
        this._defineEnv();
        this._config();
        this._mongoSetup();
        this._routes();
        this._configSwagger();
    }

    /** Here, are set up Cors, Debug log and bodyParser */
    public _config(): void {
        this.app.use(logger('dev'));
        // tslint:disable-next-line: deprecation
        this.app.use(bodyParser.json());
        // tslint:disable-next-line: deprecation
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.app.use(cors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        }));
    }

    /** Here are set up mongo connection */
    public _mongoSetup(): void {
        // if (process.env.NODE_ENV !== 'TEST') {
            this.databaseConnection = new DatabaseConnection();
            this.databaseConnection.mongoSetup();
        // }
    }

    /** Here are set up all app routes, see [Routes]{@link Routes} to more details */
    public _routes(): void {
        this.app.use('/', AppRoutes);
        this.app.use('/user', UserRoutes);
        this.app.use(errors());
    }

    /** Here are set up all swagger, see more details in [Swagger](http://localhost:3008/api-docs/swagger) */
    private _configSwagger(): void {
        this.app.use('/api-docs/swagger', express.static(path.join('swagger')));
        this.app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
        this.app.use(swagger.express({
            definition : {
                info : {
                    title : 'Test here the application APIs' ,
                    version : '1.0',
                } ,
                externalDocs : {
                    url : `${process.env.APP}:${process.env.PORT}/api-docs/swagger`,
                },
                securityDefinitions : {
                    Bearer : {
                        type : 'apiKey',
                        in : 'header',
                        name : 'Authorization',
                    },
                },
                basePath: '/',
            },
        }));
    }

    /** Here are set up .env environment, the default is DEV */
    private _defineEnv(): void {
        dotenv.config();
        this.mongo_uri = process.env.DB_URI as string;

        switch (process.env.NODE_ENV) {
            case 'DEV':
                dotenv.config({path: `${process.cwd()}/.env.dev`});
                break;
            case 'PROD':
                dotenv.config({path: `${process.cwd()}/.env.prod`});
                break;
            case 'QA':
                dotenv.config({path: `${process.cwd()}/.env.qa`});
                break;

            default:
                console.log('Environment not identified. Running default = development. NODE_ENV is set to ', process.env.NODE_ENV);
                dotenv.config({path: `${process.cwd()}/.env.dev`});
        }
    }
}

export default new App().app;
