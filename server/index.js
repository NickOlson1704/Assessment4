const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, } = require('./controller.js')


app.get("/api/compliment/", getCompliment);
app.get("/api/save-preferences")
app.get("/api/get-preferences")



app.listen(4000, () => console.log("Server running on 4000"));
