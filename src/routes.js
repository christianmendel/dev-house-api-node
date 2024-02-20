import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import HouseController from './controllers/HouseController';
import ReservaController from './controllers/ReservaController';
import SessionController from './controllers/SessionController';

const routes = new Router();
const upload = multer(uploadConfig)

routes.post('/sessions', SessionController.store)

routes.post('/house', upload.single('thumbnail'), HouseController.store)
routes.get('/houses', HouseController.index)
routes.put('/houses/:house_id', HouseController.update)
routes.delete('/houses/:house_id', HouseController.destroy)

routes.get('/houses/user', HouseController.show)

routes.post('/houses/:house_id/reserva', ReservaController.store)
routes.get('/reservas/user', ReservaController.index)
routes.delete('/reservas/cancel', ReservaController.destroy)
export default routes;