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

console.log('Server running at http://localhost:8081/');