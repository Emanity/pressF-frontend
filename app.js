const express = require('express') 
const app = express() 
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');

nunjucks.configure('views', { 
         express: app 
}); 
 
app.set('view engine', 'html');


app.get('/', function (req, res) { 
   res.render('index')
   console.log('Request processed'); 
}); 

app.get('/getAPIResponse', async (req, res) => {

   const api_url = 'http://localhost:8080/api/testMybatis'
   const fetch_response = await fetch(api_url);
   const json = await fetch_response.json();
   res.json(json);

})

app.get('/api_getTest/:testvalue', async (req, res) => {
   const testvalue = req.params.testvalue;

   const api_url = `http://localhost:8080/api/print/${testvalue}`
   const fetch_response = await fetch(api_url);
   const text = await fetch_response.text();
   res.render(text);

})

 
app.listen(7999, function() { 
   console.log('Express started') 
});

