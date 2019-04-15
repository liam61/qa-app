import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import TYPES from './constant/types';
import { UserService } from './service/user';
import './controller/home';
import './controller/user';

// load everything needed to the Container
let container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);

// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

const serverInstance = server.build();
serverInstance.listen(3000, () => console.log(`your app is running at http://localhost:3000`));
