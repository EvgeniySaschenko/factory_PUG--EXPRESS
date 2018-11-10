const express= require('express');
const router= express.Router();


router.use('/division', require('./division'));
router.use('/operation', require('./operation'));
router.use('/equipment', require('./equipment'));
router.use('/material', require('./material'));


module.exports = router;