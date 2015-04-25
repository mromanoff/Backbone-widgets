'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Widgets POC',
        script1: 'widget1',
        script2: 'widget2',
        script3: 'widget3',
        script4: 'widget4'
    });
});

module.exports = router;
