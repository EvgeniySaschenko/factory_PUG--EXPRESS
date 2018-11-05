const express= require('express');
const router= express.Router();
const Equipment= require('../model/Equipment');
const response= require('../ext/response');
const equipment= new Equipment();

/* EQUIPMENT */

router.post('/', (req, res, next)=>{
	response(equipment.addEquipment(req), res, next);
});

router.put('/', (req, res, next)=>{
	response(equipment.editEquipment(req, res, next));
});

router.get('/all', (req, res, next)=>{
	response(equipment.getEquipmentAll(), res, next);
});

router.get('/id/:id', (req, res, next)=>{
	response(equipment.getEquipmentById(req), res, next);
});

module.exports= router;