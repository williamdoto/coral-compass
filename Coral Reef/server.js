let http = require('http');

http.createServer(function (request, response) {
    console.log('request ', request.url);
    let d = new Date();
    let currentTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
    response.writeHead(200);
    response.write('Hello from FIT2095!! the time is : ' + currentTime);
    response.end();
}).listen(8080);
console.log('Server running at http://localhost:8080/');