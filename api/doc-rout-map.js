const express= require('express');
const router= express.Router();
const DocRoutMap= require('../model/DocRoutMap');
const response= require('../ext/response');
const docRoutMap= new DocRoutMap();

/* DOC ROUT MAP */

router.post('/', (req, res, next)=>{
	response(docRoutMap.addRoutMap(req), res, next);
});

router.put('/', (req, res, next)=>{
	response(docRoutMap.editRoutMap(req), res, next);
});

router.get('/id/:id', (req, res, next)=>{
	response(docRoutMap.getRoutMapById(req), res, next);
});

router.get('/search/name/:name/num_detail/:num_detail/date_create/:date_create', (req, res, next)=>{
	response(docRoutMap.getRoutMapSearch(req), res, next);
});

/* DOC ROUT MAP ITEM */

router.post('/item', (req, res, next)=>{
	response(docRoutMap.addRoutMapItem(req), res, next);
});

router.put('/item', (req, res, next)=>{
	response(docRoutMap.editRoutMapItem(req), res, next);
});

router.get('/item/id_rout_map/:id_rout_map', (req, res, next)=>{
	response(docRoutMap.getRoutMapItemAll(req), res, next);
});

module.exports= router;