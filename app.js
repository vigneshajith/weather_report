const express = require("express");
const https = require("https");
const app = express();
const { urlencoded } = require("body-parser");
require("dotenv").config({ path: "env/.env" });

app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, resp) {
  const lat = req.body.lat;
  const lon = req.body.lon;
  const units = req.body.unit;
  const appid = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`;
  console.log(url);

  https.get(url, (res) => {
    res.on("data", (data) => {
      const weather = JSON.parse(data);
      des = weather.weather[0].description;
      icon = weather.weather[0].icon;
      imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      place = weather.name;
      temp = weather.main.temp;
      resp.write(`<h1>the weather report for ${place} </h1>`);
      resp.write(`<img src="${imgurl}">`);
      resp.write(`${temp}`);
      resp.write(des);
      resp.send();
    });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, function (e) {
  console.log("server in running on port "+port);
  if (e) console.log("somting went worng");
});
