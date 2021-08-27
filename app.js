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

app.get('/job-spec', function (req, res) {
   res.render('job-spec')
   console.log('Request processed'); 
}); 

app.get('/job-roles', async (req, res) => {

   let result = await JobRoles.getJobRoles()
   res.render('job-roles', {JobRoles : result});
   
})

module.exports = app;