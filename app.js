const express = require('express') 
const app = express() 
const nunjucks = require('nunjucks');

nunjucks.configure('views', { 
         express: app 
}); 
 
app.set('view engine', 'html');


app.get('/', function (req, res) { 
   res.send('<h1>First message from Express</h1>') 
   console.log('Request processed'); 
}); 
 
app.listen(7999, function() { 
   console.log('Express started') 
});