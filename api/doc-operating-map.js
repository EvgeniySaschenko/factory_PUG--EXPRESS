const express= require('express');
const pug= require('pug');
const htmlPdf = require('html-pdf');
const fs = require('fs');
const router= express.Router();
const DocOperatingMap= require('../model/DocOperatingMap');
const response= require('../ext/response');
const docOperatingMap= new DocOperatingMap();

/* DOC AUTOMAT MAP */

router.post('/', (req, res, next)=>{
	response(docOperatingMap.addOperatingMap(req), res, next);
});

router.put('/', (req, res, next)=>{
	// fs.readFile(req.files.file_drawing.path, 'utf8', function(err, contents) {
	// 	fs.writeFile('./tmp/message.jpg', contents, (err) => {
	// 		if (err) throw err;
	// 		console.log('The file has been saved!');
	// 	});

	// });
	response(docOperatingMap.editOperatingMap(req), res, next);
});

// DOWNLOAD | VIEW - FILE
router.get('/download/id/:id', (req, res, next)=>{

	let options = {
		"directory": "./tmp/doc",
		"format": "A4",
		"orientation": "landscape",
		"border": {
			"top": "4mm",
			"right": "5mm",
			"bottom": "4mm",
			"left": "5mm"
		},
		"header": {
			"height": ""
		},
	};
	let operatingMap= docOperatingMap.getOperatingMapById(req.params.id);
	let operatingMapItemAll= docOperatingMap.getOperatingMapItemAll(req.params.id);

	Promise.all([operatingMap, operatingMapItemAll]).then(val => {

		let html = pug.compileFile(__APPROOT + '\\doc-template\\operating-map.pug');
		htmlPdf.create(html( { operatingMap: val[0], operatingMapItemAll: val[1] } ), options)
			.toFile((err, file) => {
				let name= `${val[0].operation_name} ${val[0].operation_num} (${val[0].name} ${val[0].num_detail}) от ${val[0].date_create}.pdf`;
				res.download(file.filename, name);
		});

	}, reason => {
		console.log(reason)
	})

});

/* DOC AUTOMAT MAP ITEM */

router.post('/item', (req, res, next)=>{
	response(docOperatingMap.addOperatingMapItem(req), res, next);
});

router.put('/item', (req, res, next)=>{
	response(docOperatingMap.editOperatingMapItem(req), res, next);
});

module.exports= router;