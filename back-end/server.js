const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");
const app = express();
app.use(express.json());
app.use(cors());

// [GET] /api/songs
app.get("/api/songs", async (req, res) => {
  const result = await pool.query("SELECT * FROM songs");

  if (result.rows.length === 0) {
    return res.status(501).json({
      error: "[ERROR][GET] /api/songs",
    });
  }

  res.json(result.rows);
});

// [GET] /api/songs/:id
app.get("/api/songs/:id", async (req, res) => {
  const id = Number(req.params.id);

  const result = await pool.query("SELECT * FROM songs WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return res.status(501).json({
      error: "[ERROR][GET] /api/songs/:id",
    });
  }

  res.json(result.rows[0]);
});

// [POST] /api/songs
app.post("/api/songs", async (req, res) => {
  const { title, artist, audio } = req.body;

  const result = await pool.query(
    "INSERT INTO songs (title, artist, audio) VALUES ($1, $2, $3) RETURNING *",
    [title, artist, audio],
  );

  if (result.rows.length === 0) {
    return res.status(501).json({
      error: "[ERROR][POST] /api/songs",
    });
  }

  res.status(201).json(result.rows);
});

// [PUT] /api/songs/:id
app.put("/api/songs/:id", async (req, res) => {
  const id = Number(req.params.id);

  const { title, artist, audio } = req.body;

  const result = await pool.query(
    "UPDATE songs SET title = $1 , artist = $2 , audio = $3 WHERE id = $4 RETURNING *",
    [title, artist, audio, id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: "[ERROR][PUT] /api/songs/:id",
    });
  }

  res.status(200).json(result.rows);
});

// [DELETE] /api/songs/:id
app.delete("/api/songs/:id", async (req, res) => {
  const id = Number(req.params.id);

  const result = await pool.query(
    "DELETE FROM songs WHERE id = $1 RETURNING *",
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: "[ERROR][DELETE] /api/songs/:id",
    });
  }

  res.json({
    message: "song deleted",
    song: result.rows[0],
  });
});

// [PATCH] /api/songs/:id
app.patch("/api/songs/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, artist } = req.body;

  const result = await pool.query(
    "UPDATE songs SET title = $1 , artist = $2 WHERE id = $3 RETURNING *",
    [title, artist, id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: "song not found",
    });
  }

  res.status(200).json(result.rows);
});

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("databse connected");
  })
  .catch((err) => {
    console.log("database connection failed");
    console.log(err);
  });

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
