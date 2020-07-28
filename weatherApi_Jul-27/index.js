const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res) => {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=5536b054f95419eeac83f2c3ba8e09ad&units=metric"
  console.log(req.statusCode);

  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const feelLike = weatherData.main.feels_like;
      const icon = weatherData.weather[0].icon;

      res.write(`<p>It feels more like ${feelLike} degree. </p>`);
      res.write(`<h1 class = "message">The temperature in Seoul is ${temp} degree. </br> It's ${weatherDescription}.</h1>`);
      res.write(`<img src='http://openweathermap.org/img/wn/${icon}@2x.png'>`);
      res.send();
    })
  })

// res.send('hi')
})


app.listen(4000, () => {
  console.log(`Your server started running on port : 4000`);
})
