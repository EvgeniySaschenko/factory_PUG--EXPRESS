const express= require('express');
const pug= require('pug');
const htmlPdf = require('html-pdf');
const fs = require('fs');
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


// DOWNLOAD | VIEW - FILE
router.get('/download/id/:id', (req, res, next)=>{

	let options = {
		"directory": "./tmp",
		"format": "A4",
		"orientation": "landscape",
		"border": {
			"top": "6.5mm",
			"right": "5mm",
			"bottom": "5mm",
			"left": "5mm"
		},
		"header": {
			"height": ""
		},
	};
	let routMap= docRoutMap.getRoutMapById(req);
	let routMapItemAll= docRoutMap.getRoutMapItemAll(req.params.id);
	Promise.all([routMap, routMapItemAll]).then(val => {

		let html = pug.compileFile(__APPROOT + '\\doc-template\\rout-map.pug');
		htmlPdf.create(html( { routMap: val[0], routMapItemAll: val[1] } ), options)
			.toFile((err, file) => {
				res.download(file.filename, 'report.pdf')
		});

	}, reason => {
		console.log(reason)
	})

});


module.exports= router;