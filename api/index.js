const express= require('express');
const router= express.Router();


router.use('/division', require('./division'));

module.exports = router;