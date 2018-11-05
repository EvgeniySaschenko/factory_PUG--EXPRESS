const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const Division = require(__APPROOT + '/model/Division');

const nav= new Nav();
const division= new Division();


router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_admin= nav.getNavByType({type: 'admin'});
	Promise.all([menu_main, menu_admin]).then(val => { 
			res.render('admin', {
				title: 'Админ панель',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_admin: val[1]
			});
		}, reason => {
			console.log(reason)
		});
});

router.get('/division', (req, res, next)=> {
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

module.exports = router;