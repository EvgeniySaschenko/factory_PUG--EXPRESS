const express= require('express');
const router= express.Router();
const Tool= require('../model/Tool')
const response= require('../ext/response');
const tool= new Tool();

/** TOOL */

router.post('/', (req, res, next)=>{
	response(tool.addTool(req), res, next);
});

router.put('/', (req, res, next)=>{
	response(tool.editTool(req), res, next);
});

router.get('/id_type/:id_type', (req, res, next)=>{
	response(tool.getToolByType(req), res, next);
});

/** TOOL TYPE */

router.post('/type', (req, res, next)=>{
	response(tool.addType(req), res, next);
});

router.put('/type', (req, res, next)=>{
	response(tool.editType(req), res, next);
});

router.get('/type', (req, res, next)=>{
	response(tool.ggetToolType(), res, next);
});

module.exports= router;