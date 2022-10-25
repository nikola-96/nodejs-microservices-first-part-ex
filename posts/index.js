const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: posts[id],
    });
  } catch (error) {}
  
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {

  res.send({});
});

app.listen(4000, () => {
  console.log('Sada cu rucno da izbildam, a da koristim image sa huba')
  console.log("listen on 4000");
});
