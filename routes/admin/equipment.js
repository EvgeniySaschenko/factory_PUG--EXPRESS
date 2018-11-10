const express = require('express');
const router = express.Router();
const API = require(__APPROOT + '/ext/api');
const Nav = require(__APPROOT + '/model/Nav');
const Equipment = require(__APPROOT + '/model/Equipment');

const nav= new Nav();
const equipment= new Equipment();

/**
 * Главная страница
*/

router.get('/', (req, res, next)=> {
	const menu_main= nav.getNavByType({type: 'main'});
	const menu_breadCrumbs= nav.getBreadCrumbs(req);
	const equipment_list= equipment.getEquipmentAll();
	
	Promise.all([menu_main, menu_breadCrumbs, equipment_list]).then(val => {
			res.render('admin/equipment', {
				title: 'Оборудование',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				equipment_list: val[2],
				api_addEquipment: API.equipment.addEquipment()
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
	const equipment_cur= equipment.getEquipmentById(req);
	Promise.all([menu_main, menu_breadCrumbs, equipment_cur]).then(val => {
			res.render('admin/equipment-edit', {
				title: 'Редактировать оборудование',
				curUrl: req.originalUrl,
				menu_main: val[0],
				menu_breadCrumbs: val[1],
				equipment_cur: val[2],
				api_editEquipment: API.equipment.editEquipment()
			});
		}, reason => {
			console.log(reason)
		});
});


module.exports = router;