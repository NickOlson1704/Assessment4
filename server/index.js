const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");



const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, } = require('./controller.js')

app.use(bodyParser.json());


app.get('/api/compliment/', getCompliment);

let preferences = {
    time: '08:00',
    affirmation: 'You are capable of achieving your goals'
  };
  

  app.post('/api/save-preferences', (req, res) => {
    preferences = req.body;
    res.sendStatus(200);
  });
  
  
  app.get('/api/get-preferences', (req, res) => {
    res.json(preferences);
  });



app.listen(4000, () => console.log("Server running on 4000"));
