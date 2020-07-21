import { Router } from 'express';

import CityController from '../controllers/CityController';
import TempreatureController from '../controllers/TempreatureController';

const routes = new Router();

routes.get('/cities', CityController.index);
routes.get('/cities/:id', CityController.show);
routes.post('/cities', CityController.store);

routes.get('/city-infos', TempreatureController.index);
routes.get('/city-info/:id', TempreatureController.show);
routes.post('/city-infos', TempreatureController.storeAll);
routes.post('/city-info', TempreatureController.store);

export default routes;
