const express= require('express');
const router= express.Router();
const Division= require('../model/Division');
const response= require('../ext/response');
const division= new Division();


/* DIVISION */

// Добавить подразделение
router.post('/', (req, res, next)=>{
	response(division.addDivision(req), res, next);
});

// Редактировать подразделение
router.put('/', (req, res, next)=>{
	response(division.editDivision(req), res, next);
});

// Получить список подразделений
router.get('/', (req, res, next)=>{
	response(division.getDivisionAll(), res, next);
});

/* RANK */

// Добавить должность
router.post('/rank', (req, res, next)=>{
	response(division.addRank(req), res, next);
});

// Редактировать должность
router.put('/rank', (req, res, next)=>{
	response(division.editRank(req), res, next);
});

// Получить список должностей подразделения
router.get('/rank/id_division/:id_division', (req, res, next)=>{
	response(division.getRankByIdDividion(req), res, next);
});

module.exports= router;