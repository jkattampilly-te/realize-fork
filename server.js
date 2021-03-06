// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/testing", (request, response) => {
  response.sendFile(__dirname + "/views/hudTest.html");
});

app.get("/graph-demo", (request, response) => {
  response.sendFile(__dirname + "/views/graph-demo-aframe.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// // listen for requests :)
// const listener = app.listen(60643, () => {
//   console.log("Your app is listening on port " + listener.address().port);
// });
