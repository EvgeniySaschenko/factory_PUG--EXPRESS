const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const divisionRouter = require(__APPROOT + '/routes/admin/division');

const nav= new Nav();

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

router.use('/division', divisionRouter);


module.exports = router;