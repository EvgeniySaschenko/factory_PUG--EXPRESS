const express = require('express');
const router = express.Router();
const DATA_BASE = require(__APPROOT + '/model/DATA_BASE');

const dataBase= new DATA_BASE();


router.get('/', (req, res, next)=> {
	const division= dataBase.createFieldDivision();

	Promise.all([division]).then(val => { 
		console.log('ОК')

		
		}, reason => {
			console.log(reason)
		});
});

module.exports = router;