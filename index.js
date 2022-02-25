const express = require("express");
const zadatak = require("./test-source/zadatak.json");
const songs = zadatak.tracks.data;

const app = express();

app.use(express.json());

app.get("/tracks", (req, res) => {
  res.send(songs);
});

app.get("/tracks/sorted", (req, res) => {
  const sortCriteria = req.query.sortBy;
  if (sortCriteria === "name") {
    songs.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    res.send(songs);
  } else if (sortCriteria === "duration") {
    songs.sort((a, b) => a.duration - b.duration);
    res.send(songs);
  } else {
    res.send(
      "Unfortunately you chose invalid criteria, please select 'name' or 'duration'"
    );
  }
});

app.get("/tracks/:id", (req, res) => {
  const id = req.params.id;
  const songById = songs.filter((song) => song.id == id);
  if (songById.length < 1) {
    res.send("No song with such ID was found");
  } else {
    res.send(songById);
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
