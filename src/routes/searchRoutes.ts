import express from 'express'
import { Auth } from '../middlewares/Auth';
import {  searchByName,searchByPhone } from '../controller/searchController';


let router = express.Router();

router.get('/name',Auth, searchByName);
router.get('/phone',Auth, searchByPhone);

export default router;