const express= require('express');
const router= express.Router();
const Nav= require('../model/Nav');
const response= require('../ext/response');
const nav= new Nav();

/** NAV */

router.get('/type/:type', (req, res, next)=>{
	response(nav.getNavByType(req), res, next);
});

module.exports= router;