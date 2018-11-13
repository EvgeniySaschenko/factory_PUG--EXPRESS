const express= require('express');
const router= express.Router();
const Material= require('../model/Material');
const response= require('../ext/response');
const material= new Material();

/** MATERIAL */

router.post('/', (req, res, next)=>{
	response(material.addMaterial(req), res, next);
});

router.put('/', (req, res, next)=>{
	response(material.editMaterial(req), res, next);
});

router.get('/id/:id', (req, res, next)=>{
	response(material.getMaterialById(req), res, next);
});

router.get('/id_type/:id_type/id_use/:id_use', (req, res, next)=>{
	response(material.getMaterialByTypeAndUse(req), res, next);
});

router.get('/id_type/:id_type/id_use/:id_use/mark/:mark', (req, res, next)=>{
	response(material.getMaterialSearch(req), res, next);
});

router.get('/search', (req, res, next)=>{
	response(material.getMaterialSearch(req), res, next);
});


/** MATERIAL TYPE */

router.post('/type', (req, res, next)=>{
	response(material.addType(req), res, next);
});

router.put('/type', (req, res, next)=>{
	response(material.editType(req), res, next);
});

router.get('/type/all', (req, res, next)=>{
	response(material.getMaterialTypeAll(), res, next);
});

module.exports = router;