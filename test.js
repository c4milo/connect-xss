var express = require('express');

var app = express.createServer();
var xssfilter = require('./xss');

app.configure(function() {
    app.use(xssfilter());
    app.use(express.bodyParser());
});

app.get('/swarms/:id/:args', function(req, res) {
    //res.send('<b>hello</b><img src="http://asdf">
    //<a href="javascript:alert(0)"><script src="http://dfd"><\/script>');
    var params = req.params;
	var query = req.query;
	var headers = req.headers;

	console.log('sanitized data');
    console.log('params:');
	console.log(params);
	console.log('============');
	console.log('query');
	console.log(query);
	console.log('==========');
	console.log('headers:');
	console.log(headers);

    var eso = JSON.parse(req.query.ah);

    res.send('Hello world');
});

app.post('/', function(req, res) {
    console.log('sanitized body');
    console.log(req.body);
});

app.listen(3000);

