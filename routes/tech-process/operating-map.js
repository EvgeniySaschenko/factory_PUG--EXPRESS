const htmlPdf = require('html-pdf');
const fs = require('fs');
const pug = require('pug');
const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const DocOperatingMap = require(__APPROOT + '/model/DocOperatingMap');
const Equipment = require(__APPROOT + '/model/Equipment');

const nav= new Nav();
const docOperatingMap= new DocOperatingMap();
const equipment= new Equipment();


router.get('/edit/id/:id', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const operatingMap_cur= docOperatingMap.getOperatingMapById(req.params.id);
	const operatingMapItems_list= docOperatingMap.getOperatingMapItemAll(req.params.id);
	const equipment_list= equipment.getEquipmentGroupByNameAndModel();

	var html = pug.compileFile(__APPROOT + '\\test\\1.pug');

	//var html = fs.readFileSync(__APPROOT + '\\test\\1.html', 'utf8');
	var options = {
		"format": "A4",
		"orientation": "landscape",
	};

	console.log( html({title: 'TITLE' }) )

	htmlPdf.create(html({title: 'TITLE' }), options).toFile(__APPROOT + '\\test\\2.pdf', function(err, res) {
		if (err) return console.log(err);
		console.log(res); // { filename: '/app/businesscard.pdf' }
	});



	Promise.all([menu_main, menu_breadCrumbs, operatingMap_cur, operatingMapItems_list, equipment_list]).then(val => {

			res.render('tech-process/operating-map-edit', {
				title: `Редактировать ОК: ${ val[2].operation_name } №${ val[2].operation_num }`,
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				operatingMap_cur: val[2],
				operatingMapItems_list: val[3],
				equipment_list: val[4],
				api_editOperatingMap: API.docOperatingMap.editOperatingMap(),
				api_addOperatingMapItem: API.docOperatingMap.addOperatingMapItem(),
				api_editOperatingMapItem: API.docOperatingMap.editOperatingMapItem(),
			});
		}, reason => {
			console.log(reason)
		});
});


module.exports = router;