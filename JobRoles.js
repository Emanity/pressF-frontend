const fetch = require('node-fetch');


exports.getJobRoles = async () => {

api_url = 'http://localhost:8080/api/getjobroles' //'http://localhost:8080/api/getjobroles'

const fetch_response = await fetch(api_url);
return  await fetch_response.json();

}