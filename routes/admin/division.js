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
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const division_list= division.getDivisionAll();
	const rank_list= division.getRankAll();
	
	Promise.all([menu_main, menu_breadCrumbs, division_list, rank_list]).then(val => {
			res.render('admin/division', {
				title: 'Подразделения',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				division_list: val[2],
				rank_list: val[3],
				api_addDivision: API.division.addDivision(),
				api_addRank: API.division.addRank()
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
	const division_cur= division.getDivisionById(req);
	Promise.all([menu_main, menu_breadCrumbs, division_cur]).then(val => {
			res.render('admin/division-edit', {
				title: 'Редактировать подразделение',
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

router.get('/edit/rank/id/:id', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const rank_cur= division.getRankById(req);
	const division_list= division.getDivisionAll();
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	Promise.all([menu_main, menu_breadCrumbs, rank_cur, division_list]).then(val => {
			res.render('admin/division-edit-rank', {
				title: 'Редактировать должность',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				rank_cur: val[2],
				division_list: val[3],
				api_editRank: API.division.editRank()
			});
		}, reason => {
			console.log(reason)
		});
});

module.exports = router;