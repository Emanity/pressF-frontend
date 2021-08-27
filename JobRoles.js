const fetch = require('node-fetch');

exports.getJobRoles = async () => {

    api_url = 'http://localhost:8080/api/getjobroles'

    const fetch_response = await fetch(api_url)

        if (fetch_response.status >= 200 && fetch_response.status <= 299) {

            console.log("Job Roles Fetched");
            return await fetch_response.json();
        
        } else {

            console.log(fetch_response.status, ' | ' ,  fetch_response.statusText, " | Unable to Fetch Job Roles");
            return null;
        
        }

}

exports.getJobRoleDetails = async ( jobRoleID ) => {

    jobRoleID = jobRoleID;

    api_url = `http://localhost:8080/api/getjobspec/${jobRoleID}`;

    const fetch_response = await fetch(api_url)
        
        if (fetch_response.status >= 200 && fetch_response.status <= 299) {
            
            console.log("Job Spec Fetched");
            return await fetch_response.json();

        }
        else {

            console.log(fetch_response.status, ' | ', fetch_response.statusText, " | Unable to fetch Job Spec ");
            return null

        }

}
