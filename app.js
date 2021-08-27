const express = require('express') 
const app = express() 
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');
var path = require('path')

const bodyParser = require('body-parser');
const JobRoles = require('./JobRoles');
const { json } = require('express');

app.use(bodyParser.urlencoded({ extended: true }));

//Configuring Express to use Nunjucks
nunjucks.configure('views', {
         autoescape: true,
         express: app 
}); 

// Provide Public files such as Images & Styling
app.use(express.static('public'))

// Nunjucks view engine
app.set('view engine', 'html');

app.get('/', function (req, res) { 
   res.render('index')
   console.log('Request processed'); 
}); 

app.get('/index', function (req, res) {
   res.render('index')
   console.log('Request processed'); 
}); 

app.get('/job-roles', async (req, res) => {

   let result = await JobRoles.getJobRoles()
   res.render('job-roles', {JobRoles : result});
   
})

app.get('/job-role-details/:jobRoleID', async (req, res) => {
   
   jobRoleID = req.params.jobRoleID;

   let result = await JobRoleDetails.getJobRoleDetails(jobRoleID);

   res.render('job-role-details', {JobRoles : result})

})

module.exports = app;

// // POC - API Call (Passing a value to JAVA API)
// app.get('/api_getTest/:testvalue', async (req, res) => {

//    // Request parameters URL
//    testvalue = req.params.testvalue;

//    // API URL Var
//    api_url = `http://localhost:8080/api/print/${testvalue}`

//    // Fetch from API URL
//    const fetch_response = await fetch(api_url);

//    // API Response in HTML/Text
//    const text = await fetch_response.text();

//    // Render Response in Text - (NOTE- Any DB Response will be JSON won't need this again. Error is expected, due to looking for Nunjucks)
//    res.render(text);

// })