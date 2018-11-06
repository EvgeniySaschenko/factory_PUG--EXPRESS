const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const Division = require(__APPROOT + '/model/Division');

const nav= new Nav();
const division= new Division();

/**
 * Главная страница
*/

router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const division_list= division.getDivisionAll();

	
	Promise.all([menu_main, division_list]).then(val => {
			res.render('admin/division', {
				title: 'Админ панель: подразделения',
				curUrl: req.originalUrl,
				menu_main: val[0],
				division_list: val[1],
				api_addDivision: API.division.addDivision()
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
	const division_cur= division.getNDivisionById(req);
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	Promise.all([menu_main, menu_breadCrumbs, division_cur]).then(val => {
			res.render('admin/division-edit', {
				title: 'Админ панель: редактировать подразделение',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				division_cur: val[2],
				api_editDivision: API.division.editDivision()
			});
		}, reason => {
			console.log(reason)
		});
});

module.exports = router;