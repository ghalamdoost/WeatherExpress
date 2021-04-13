var express = require('express');
var router = express.Router();
const ctrMain = require('../controllers/main');
const ctrAbout = require('../controllers/about');


/* GET home page. */
router.get('/', ctrMain.index);
router.get('/about', ctrAbout.about);
router.get('/ss',ctrMain.stest);

module.exports = router;
