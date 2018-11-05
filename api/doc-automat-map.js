const express= require('express');
const router= express.Router();
const DocAutomatMap= require('../model/DocAutomatMap');
const response= require('../ext/response');
const docAutomatMap= new DocAutomatMap();

/* DOC AUTOMAT MAP */

router.post('/', (req, res, next)=>{
	response(docAutomatMap.addAutomatMap(req), res, next);
});

router.put('/', (req, res, next)=>{
	response(docAutomatMap.editAutomatMap(req, res, next));
});

router.get('/id/:id', (req, res, next)=>{
	response(docAutomatMap.getAutomatMapById(req), res, next);
});

/* DOC AUTOMAT MAP ITEM */

router.post('/item', (req, res, next)=>{
	response(docAutomatMap.addAutomatMapItem(req), res, next);
});

router.put('/item', (req, res, next)=>{
	response(docAutomatMap.editAutomatMapItem(req, res, next));
});

router.get('/item/id_automat_map/:id_automat_map', (req, res, next)=>{
	response(docAutomatMap.getAutomatMapItemAll(req), res, next);
});

module.exports= router;