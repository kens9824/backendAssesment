import express from 'express'

import {
    getAllRecords,
} from '../controller/getAllRecordController'

let router = express.Router();

router.get('/', getAllRecords);


export default router;
