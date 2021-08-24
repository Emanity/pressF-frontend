const express = require('express') 
const app = express() 
const nunjucks = require('nunjucks');

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));

// Port
let port = 7999;

//Configuring Express to use Nunjucks
nunjucks.configure('views', {
         autoescape: true,
         express: app 
}); 

// Provide Public files such as Images & Styling
app.use(express.static('public'))

// Nunjucks view engine
//app.set('view engine', 'njk');
app.set('view engine', 'html');


app.get('/', function (req, res) { 
   res.render('index')
   console.log('Request processed'); 
}); 

app.get('/index', function (req, res) {
   res.render('index')
   console.log('Request processed'); 
}); 

// Start Server
app.listen(port, function() {
   console.log('Express started')
});
