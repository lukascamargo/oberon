import App from './config/app';
import * as http from 'http';

http.createServer(App).listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`))