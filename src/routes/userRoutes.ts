import express from 'express'

import {
    getAllUsers,
    Login,
    Register
} from '../controller/userController'


let router = express.Router();

router.post('/', Register);
router.post('/login', Login);

router.get('/', getAllUsers);


export default router;
