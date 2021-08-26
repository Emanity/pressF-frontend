const fetch = require('node-fetch');

exports.getJobRoles = async () => {

    api_url = 'http://localhost:8080/api/getjobroles' 

    const fetch_response = await fetch(api_url)
    // TO DO - Error Handling for fetch
    // .then(function(){
    //     console.log("Job Roles Fetched");
    // })
    // .catch(function(){
    //     console.log("Unable to Fetch Job Roles");
    // });


    return await fetch_response.json();
}