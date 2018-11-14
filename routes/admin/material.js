const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const Material = require(__APPROOT + '/model/Material');
const GlobalSettings = require(__APPROOT + '/model/GlobalSettings');


const nav= new Nav();
const material= new Material();
const globalSettings= new GlobalSettings();

/**
 * Главная страница
*/

router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const materialType_list= material.getMaterialTypeAll();
	const globalSettings_list= globalSettings.getAll();

	Promise.all([menu_main, menu_breadCrumbs, materialType_list, globalSettings_list]).then(val => {
			res.render('admin/material', {
				title: 'Материал',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				materialType_list: val[2],
				materialUse_list: val[3].filter(e => e.type == 'material_use'),
				api_addMaterialType: API.material.addType(),
				api_addMaterial: API.material.addMaterial(),
				api_getMaterialSearch: API.material.getMaterialSearch()
			});
		}, reason => {
			console.log(reason)
		});
});

/**
 * Редактировать
*/
router.get('/edit/id/:id', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const material_cur= material.getMaterialById(req);
	const materialType_list= material.getMaterialTypeAll();
	const globalSettings_list= globalSettings.getAll();

	Promise.all([menu_main, menu_breadCrumbs, material_cur, materialType_list, globalSettings_list]).then(val => {
			res.render('admin/material-edit', {
				title: 'Редактировать материал',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				material_cur: val[2],
				materialType_list: val[3],
				materialUse_list: val[4].filter(e => e.type == 'material_use'),
				api_editMaterial: API.material.editMaterial()
			});
		}, reason => {
			console.log(reason)
		});
});

router.get('/edit/type/id/:id', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const materialType_cur= material.getMaterialTypeById(req);

	Promise.all([menu_main, menu_breadCrumbs, materialType_cur]).then(val => {
			res.render('admin/material-edit-type', {
				title: 'Редактировать базовый материал',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				materialType_cur: val[2],
				api_editMaterialType: API.material.editType()
			});
		}, reason => {
			console.log(reason)
		});
});


module.exports = router;