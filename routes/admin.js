const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const divisionRouter = require(__APPROOT + '/routes/admin/division');
const techProcessRouter = require(__APPROOT + '/routes/admin/tech-process');
const equipmentRouter = require(__APPROOT + '/routes/admin/equipment');
const materialRouter = require(__APPROOT + '/routes/admin/material');

const nav= new Nav();

router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_admin= nav.getNavByType({type: 'admin'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	Promise.all([menu_main, menu_admin, menu_breadCrumbs]).then(val => {
			res.render('admin', {
				title: 'Админ панель',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_admin: val[1],
				menu_breadCrumbs: val[2],
			});
		}, reason => {
			console.log(reason)
		});
});

router.use('/division', divisionRouter);

router.use('/tech-process', techProcessRouter);

router.use('/equipment', equipmentRouter);

router.use('/material', materialRouter);

module.exports = router;