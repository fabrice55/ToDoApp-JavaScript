import express from 'express';
const webRouter = express.Router();
import * as itemsController from '../controllers/items.controller';
import { passwordProtected } from '../middleware/auth.middleware';

// All web routes require authentication
webRouter.use(passwordProtected);

webRouter.get("/", itemsController.home);
webRouter.post("/create-item", itemsController.create);
webRouter.post('/update-item', itemsController.update);
webRouter.post('/delete-item', itemsController.deleteItem);

export default webRouter;
