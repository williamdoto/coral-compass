let http = require('http');
const express = require('express')
const path = require("path");
const app = express();
const PORT_NUMBER = 8081;
app.use("/", express.static(path.join(__dirname, "./coralang/dist/coralang")));
app.use(express.json())
app.listen(PORT_NUMBER, () => {
    console.log(`Listening on port ${PORT_NUMBER}`);
  });

// http.createServer(function (request, response) {
//     console.log('request ', request.url);
//     let d = new Date();
//     let currentTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
//     response.writeHead(200);
//     response.write('Hello from FIT2095!! the time is : ' + currentTime);
//     response.end();
// }).listen(8080);
console.log('Server running at http://localhost:8081/');