const express= require('express');
const router= express.Router();
const User= require('../model/User');
const response= require('../ext/response');
const user= new User();

/** USER */

router.post('/', (req, res, next)=>{
	response(user.addUser(req), res, next);
});

router.get('/id/:id', (req, res, next)=>{
	response(user.getUserById(req), res, next);
});

module.exports = router;