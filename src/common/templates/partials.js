'use strict';

var Handlebars = require('hbsfy/runtime');


Handlebars.registerPartial('userMessage',
    '<{{tagName}}>By {{author.firstName}} {{author.lastName}}</{{tagName}}>'
    + '<div class="body">{{body}}</div>');
var context = {
    author: {firstName: 'Alan', lastName: 'Johnson'},
    body: 'I Love Handlebars',
    comments: [{
        author: {firstName: 'Yehuda', lastName: 'Katz'},
        body: 'Me too!'
    }]
};
