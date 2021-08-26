const fetch = require('node-fetch');



exports.getJobRoles = async () => {

    const res = await fetch('http://localhost:8080/api/getjobroles')
    const json = await res.json()
 
    console.log("Job Roles Fetched");
    return await json;


}
