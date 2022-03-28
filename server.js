import express from "express";
import cors from "cors";
import db from "./db.js";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/:word", (req, res) => {
  let selectedWord = db.data.posts.find(
    (item) => item.word === req.params.word
  );

  if (selectedWord !== undefined) {
    res.send(selectedWord);
  } else {
    axios(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${req.params.word}`
    ).then((result) => {
      res.send(result.data[0]);

      db.data.posts.push(result.data[0]);
      db.write();
    });
  }
});

app.listen(3005, () => {
  console.log("Listening to port 3005");
});
