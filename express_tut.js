var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

// more imports here
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home');
});

app.use(function(req, res, next){
	console.log("Looking for URL : " + req.url);

	next();
});

app.get('/junk', function(req, res, next){
	console.log('Tried to access /junk');
	throw new Error('/junk doesn\'t exists');
}); 

app.use(function(err, req, res, next){
	console.log("Error: " + err.message);
	next();
});

app.get('/about', function(req, res){
	res.render('about');
});

app.use(function(req, res){
	res.type('text/html');
	res.status(404);
	res.render('404');
});

app.use(function(req, res, err, next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log("Express started on http://localhost:" + app.get('port') + ". Press CTRL-C to terminate.");
});