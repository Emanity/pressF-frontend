const fetch = require('node-fetch');



exports.getJobRoles = async () => {

    api_url = 'http://localhost:8080/api/getjobroles'

    const fetch_response = await fetch(api_url)

 
    console.log("Job Roles Fetched");
    console.log(fetch_response)
    return await fetch_response.json();

}
