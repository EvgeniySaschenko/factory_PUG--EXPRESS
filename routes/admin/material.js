const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const Material = require(__APPROOT + '/model/Material');

const nav= new Nav();
const material= new Material();

/**
 * Главная страница
*/

router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const materialType_list= material.getMaterialTypeAll();

	Promise.all([menu_main, menu_breadCrumbs, materialType_list]).then(val => {
			res.render('admin/material', {
				title: 'Материал',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				materialType_list: val[2],
				api_addMaterialType: API.material.addType()
			});
		}, reason => {
			console.log(reason)
		});
});

/**
 * Редактировать
*/
router.get('/edit/type/id/:id', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const material_cur= material.getMaterialTypeById(req);
	Promise.all([menu_main, menu_breadCrumbs, material_cur]).then(val => {
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