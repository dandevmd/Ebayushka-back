import {Router} from 'express';
import { verifyToken } from '../midwares';
import {cartController} from '../controllers/cartController'



const cartRouter = Router()

cartRouter.post('/save-cart', verifyToken, cartController.savedCart)
cartRouter.get('/get-cart', verifyToken, cartController.getCart)
cartRouter.delete('/delete-cart', verifyToken, cartController.deleteCart)

export default cartRouter