const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const GlobalSettings = require(__APPROOT + '/model/GlobalSettings');
const Material = require(__APPROOT + '/model/Material');

const nav= new Nav();
const material= new Material();
const globalSettings= new GlobalSettings();



router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const materialType_list= material.getMaterialTypeAll();
	const globalSettings_list= globalSettings.getAll();

	Promise.all([menu_main, menu_breadCrumbs, materialType_list, globalSettings_list]).then(val => {
			res.render('tech-process', {
				title: 'Тех. процесс',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				materialType_list: val[2],
				unitsMeasure_list: val[3].filter(e => e.type == 'units_measure'),
				typeIngot_list: val[3].filter(e => e.type == 'type_ingot'),
			});
		}, reason => {
			console.log(reason)
		});
});

module.exports = router;