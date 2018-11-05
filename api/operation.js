const express= require('express');
const router= express.Router();
const Operation= require('../model/Operation');
const response= require('../ext/response');
const operation= new Operation();

/** OPERATION */

router.post('/', (req, res, next)=>{
	response( operation.addOperation(req), res, next);
});

router.put('/', (req, res, next)=>{
	response( operation.editOperation(req), res, next);
});

router.get('/all', (req, res, next)=>{
	response( operation.getOperationAll(), res, next);
});

module.exports= router;