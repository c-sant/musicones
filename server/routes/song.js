const express = require("express");
const router = express.Router();
const song = require("../controllers/song");

router.get("/songs", song.getAllSongs);
router.get("/songs/:id", song.getSongById);

module.exports = router;
