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


// POC - API Call (simple JSON response from API Call - with DB Connection)
app.get('/getAPIResponse', async (req, res) => {

   // API URL Var
   api_url = 'http://localhost:8080/api/testMybatis'

   // Fetch from API URL
   const fetch_response = await fetch(api_url);

   // API Response (Async - NEEDS await)
   const json = await fetch_response.json();

   // Send JSON Response to page
   res.json(json);

})

// POC - API Call (Passing a value to JAVA API)
app.get('/api_getTest/:testvalue', async (req, res) => {

   // Request parameters URL
   testvalue = req.params.testvalue;

   // API URL Var
   const api_url = `http://localhost:8080/api/print/${testvalue}`

   // Fetch from API URL
   const fetch_response = await fetch(api_url);

   // API Response in HTML/Text
   const text = await fetch_response.text();

   // Render Response in Text - (NOTE- Any DB Response will be JSON won't need this again. Error is expected, due to looking for Nunjucks)
   res.render(text);

})

 
app.listen(7999, function() { 
   console.log('Express started') 
});

