import {Router} from 'express';
import { verifyToken } from '../midwares';
import {stripeController} from '../controllers/stripeController'

const stripeRouter: Router = Router();

stripeRouter.post('/create-payment-intent', verifyToken, stripeController.createPaymentIntent)


export default stripeRouter;