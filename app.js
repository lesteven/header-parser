var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

var port = (process.env.PORT || 3000);

app.use(express.static(__dirname +'/public'));

app.get('/whoami',function(req,res){
	var re = /\(([^)]+)\)/;

	var ip = req.headers['x-forwarded-for'];
	var lang = req.acceptsLanguages()[0];
	var software = re.exec(req.headers['user-agent'])[1]

	res.json({
		"ip-address": ip,
		"language": lang,
		"software": software,
	})
})



app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})