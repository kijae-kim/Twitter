import express from 'express';
import {body} from 'express-validator';
import * as authController from '../controller/auth.js';
import {validate} from '../middleware/validator.js';

const router = express.Router();

const validateSignup = [
    body('username').trim().isLength({min:3}).withMessage('Min 3 Words'),
    body('password').trim().isLength({min:4}).withMessage('Min 4 Words'),
    body('email').trim().isEmail().withMessage('Check your Email type'), validate
]

router.post('/signup', validateSignup, authController.signup);

router.post('/login', authController.login);

export default router;