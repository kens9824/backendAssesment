import express from 'express'
import { Auth } from '../middlewares/Auth';
import {  getAllContact } from '../controller/contactController';


let router = express.Router();

router.get('/', Auth, getAllContact);


export default router;