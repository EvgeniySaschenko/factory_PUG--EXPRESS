const express = require('express');
const pdfmake = require('pdfmake');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const GlobalSettings = require(__APPROOT + '/model/GlobalSettings');
const Material = require(__APPROOT + '/model/Material');
const DocRoutMap = require(__APPROOT + '/model/DocRoutMap');
const DocOperatingMap = require(__APPROOT + '/model/DocOperatingMap');
const Division = require(__APPROOT + '/model/Division');
const Operation = require(__APPROOT + '/model/Operation');
const Equipment = require(__APPROOT + '/model/Equipment');


const nav= new Nav();
const material= new Material
const globalSettings= new GlobalSettings();
const docRoutMap= new DocRoutMap();
const docOperatingMap= new DocOperatingMap();
const division= new Division();
const operation= new Operation();
const equipment= new Equipment();


router.get('/edit/id/:id', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const materialType_list= material.getMaterialTypeAll();
	const material_list= material.getMaterialByUseAll(1);
	const globalSettings_list= globalSettings.getAll();
	const routMap_cur= docRoutMap.getRoutMapById(req);
	const routMapItems_list= docRoutMap.getRoutMapItemAll(req.params.id);
	const operatingMapItems_list= docOperatingMap.getOperatingMapAll(req.params.id);
	const rank_list= division.getRankAll();
	const operation_list= operation.getOperationAll();

	Promise.all([menu_main, menu_breadCrumbs, materialType_list, material_list, globalSettings_list, routMap_cur, routMapItems_list, operatingMapItems_list, rank_list, operation_list]).then(val => {
			res.render('tech-process/rout-map-edit', {
				title: 'Редактировать маршрутную карту:',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				materialType_list: val[2],
				material_list: val[3],
				unitsMeasure_list: val[4].filter(e => e.type == 'units_measure'),
				typeIngot_list: val[4].filter(e => e.type == 'type_ingot'),
				routMap_cur: val[5],
				routMapItems_list: val[6],
				operatingMapItems_list: val[7],
				rank_list: val[8], 
				operation_list: val[9],
				api_editRoutMap: API.docRoutMap.editRoutMap(),
				api_addRoutMapItem: API.docRoutMap.addRoutMapItem(),
				api_editRoutMapItem: API.docRoutMap.editRoutMapItem(),
			});
		}, reason => {
			console.log(reason)
		});
});

router.get('/doc-list/id/:id', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const routMap_cur= docRoutMap.getRoutMapById(req);
	const operatingMapItems_list= docOperatingMap.getOperatingMapAll(req.params.id);

	Promise.all([menu_main, menu_breadCrumbs, routMap_cur, operatingMapItems_list]).then(val => {
			res.render('tech-process/doc-list', {
				title: `Документы ${ val[5].operation_name } №${ val[5].operation_num }`,
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				routMap_cur: val[2],
				operatingMapItems_list: val[3],
				api_downloadRoutMap: API.docRoutMap.downloadRoutMap(),
				api_viewRoutMap: API.docRoutMap.viewRoutMap(),
				api_downloadOperatingMap: API.docOperatingMap.downloadOperatingMap(),
				api_viewOperatingMap: API.docOperatingMap.viewOperatingMap(),
			});
		}, reason => {
			console.log(reason)
		});
});

module.exports = router;