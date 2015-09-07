'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Backbone Widgets',
        script1: 'widget1',
        script2: 'widget2',
        script3: 'widget3',
        script4: 'widget4',
        script5: 'widget5'
    });
});

module.exports = router;
