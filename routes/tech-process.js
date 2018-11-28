const express = require('express');
const router = express.Router();
const routMapRouter = require(__APPROOT + '/routes/tech-process/rout-map');
const operatingMapRouter = require(__APPROOT + '/routes/tech-process/operating-map');
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const GlobalSettings = require(__APPROOT + '/model/GlobalSettings');
const Material = require(__APPROOT + '/model/Material');
const DocRoutMap = require(__APPROOT + '/model/DocRoutMap');


const nav= new Nav();
const material= new Material();
const globalSettings= new GlobalSettings();
const docRoutMap= new DocRoutMap();


router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});

	
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const materialType_list= material.getMaterialTypeAll();
	const material_list= material.getMaterialByUseAll(1);
	const globalSettings_list= globalSettings.getAll();
	const docRoutMap_list= docRoutMap.getRoutMapRecent();

	Promise.all([menu_main, menu_breadCrumbs, materialType_list, material_list, globalSettings_list, docRoutMap_list]).then(val => {
			res.render('tech-process', {
				title: 'Тех. процесс',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				materialType_list: val[2],
				material_list: val[3],
				unitsMeasure_list: val[4].filter(e => e.type == 'units_measure'),
				typeIngot_list: val[4].filter(e => e.type == 'type_ingot'),
				docRoutMap_list: val[5],
				api_addRoutMap: API.docRoutMap.addRoutMap(),
				api_getRoutMapSearch: API.docRoutMap.getRoutMapSearch()
			});
		}, reason => {
			console.log(reason)
		});
});

router.use('/rout-map', routMapRouter);
router.use('/operating-map', operatingMapRouter);

module.exports = router;