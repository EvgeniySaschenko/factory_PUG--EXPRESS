const express= require('express');
const router= express.Router();
const DocOperatingMap= require('../model/DocOperatingMap');
const response= require('../ext/response');
const docOperatingMap= new DocOperatingMap();

/* DOC AUTOMAT MAP */

router.post('/', (req, res, next)=>{
	response(docOperatingMap.addOperatingMap(req), res, next);
});

router.put('/', (req, res, next)=>{
	response(docOperatingMap.editOperatingMap(req), res, next);
});

router.get('/id/:id', (req, res, next)=>{
	response(docOperatingMap.getOperatingMapById(req), res, next);
});

/* DOC AUTOMAT MAP ITEM */

router.post('/item', (req, res, next)=>{
	response(docOperatingMap.addOperatingMapItem(req), res, next);
});

router.put('/item', (req, res, next)=>{
	response(docOperatingMap.editOperatingMapItem(req), res, next);
});

router.get('/item/id_automat_map/:id_automat_map', (req, res, next)=>{
	response(docOperatingMap.getOperatingMapItemAll(req), res, next);
});

module.exports= router;