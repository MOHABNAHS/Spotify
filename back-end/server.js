const express = require("express");
const app = express();
app.use(express.json());

const songs = [
  {
    id: 1,
    title: "song 1",
    artist: "artist 1",
    audio: "/audio/song1.mp3",
  },
  {
    id: 2,
    title: "song 2",
    artist: "artist 2",
    audio: "/audio/song2.mp3",
  },
];

// [GET] /api/songs
app.get("/api/songs", async (req, res) => {
  res.json(songs);
});

// [GET] /api/songs/:id
app.get("/api/songs/:id", async (req, res) => {
  const id = Number(req.params.id);

  const song = songs.find((song) => song.id === id);

  res.json({
    song,
  });
});

// [POST] /api/songs
app.post("/api/songs", async (req, res) => {
  const { title, artist, audio } = req.body;

  const newSong = {
    id: Math.max(...songs.map((song) => song.id)) + 1,
    title,
    artist,
    audio,
  };

  songs.push(newSong);

  res.status(201).json({ newSong });
});

// [PUT] /api/songs/:id
app.put("/api/songs/:id", async (req, res) => {
  const id = Number(req.params.id);

  const song = songs.findIndex((song) => song.id === id);

  if (song === -1) {
    return res.status(404).json({
      error: "song not found",
    });
  }

  const { title, artist, audio } = req.body;

  song.title = title;
  song.artist = artist;
  song.audio = audio;

  res.json(song);
});

// [DELETE] /api/songs/:id
app.delete("/api/songs/:id", async (req, res) => {
  const id = Number(req.params.id);

  const song = songs.findIndex((song) => song.id === id);

  if (!song) {
    return res.status(404).json({
      error: "song not found",
    });
  }

  const deletedSong = songs.splice(song, 1);

  res.json({
    message: "song deleted",
    song: deletedSong[0],
  });
});

// [PATCH] /api/songs/:id
app.patch("/api/songs/:id", async (req, res) => {
  const id = Number(req.params.id);

  const song = songs.findIndex((song) => song.id === id);

  if (song === -1) {
    return res.status(404).json({
      error: "song not found",
    });
  }

  const { title, artist } = req.body;

  if (title !== undefined) {
    song.title = title;
  }

  if (artist !== undefined) {
    song.artist = artist;
  }

  res.json(song);
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
