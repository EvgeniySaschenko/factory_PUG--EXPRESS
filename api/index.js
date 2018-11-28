const express= require('express');
const router= express.Router();


router.use('/division', require('./division'));
router.use('/operation', require('./operation'));
router.use('/equipment', require('./equipment'));
router.use('/material', require('./material'));
router.use('/tool', require('./tool'));
router.use('/user', require('./user'));
router.use('/doc-rout-map', require('./doc-rout-map'));
router.use('/doc-operating-map', require('./doc-operating-map'));


module.exports = router;