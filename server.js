const app = require('./app')

// // Port
let port = 7999;

// Start Server
app.listen(port, function() {
    console.log('Express started')
 });