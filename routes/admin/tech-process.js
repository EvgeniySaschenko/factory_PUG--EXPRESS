const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const Operation = require(__APPROOT + '/model/Operation');

const nav= new Nav();
const operation= new Operation();

/**
 * Главная страница
*/

router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const operation_list= operation.getOperationAll();
	
	Promise.all([menu_main, menu_breadCrumbs, operation_list]).then(val => {
			res.render('admin/tech-process', {
				title: 'Операции',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				operation_list: val[2],
				api_addOperation: API.operation.addOperation()
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
	const operation_cur= operation.getOperationById(req);
	Promise.all([menu_main, menu_breadCrumbs, operation_cur]).then(val => {
			res.render('admin/tech-process-edit', {
				title: 'Редактировать операцию',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				operation_cur: val[2],
				api_editOperation: API.operation.editOperation()
			});
		}, reason => {
			console.log(reason)
		});
});

module.exports = router;