const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');

const nav= new Nav();

/* GET home page. */
router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	
	Promise.all([menu_main]).then(val => { 
			res.render('index', { 
				title: 'Главная', 
				curUrl: req.originalUrl,
				menu_main: val[0]
			});
		}, reason => {
			console.log(reason)
		});
});

module.exports = router;
