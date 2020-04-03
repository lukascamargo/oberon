import 'module-alias/register';
// tslint:disable-next-line: ordered-imports
import App from '@config/app';
import * as http from 'http';

http.createServer(App).listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`))