import express from 'express'

import {
   createSpam,
   getAllSpam
} from '../controller/spamController'


let router = express.Router();

router.post('/', createSpam );
router.get('/', getAllSpam);


export default router;
