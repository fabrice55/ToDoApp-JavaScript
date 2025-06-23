import express from 'express';
const apiRouter = express.Router();
import * as itemsController from '../controllers/items.controller';
import * as authController from '../controllers/auth.controller';

apiRouter.post('/authenticate', authController.createToken);
apiRouter.post('/create-item', authController.verifyToken, itemsController.apiCreate);
apiRouter.post('/update-item', authController.verifyToken, itemsController.apiUpdate);
apiRouter.post('/delete-item', authController.verifyToken, itemsController.apiDelete);
apiRouter.post('/view-items', authController.verifyToken, itemsController.apiViewListOfItems);

export default apiRouter;
