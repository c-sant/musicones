const Song = require("../models/song");

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSongById = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findByPk(id);

    if (!song) {
      return res.status(404).json({ error: `Song with id ${id} not found.` });
    }

    res.status(200).json(song);
  } catch (error) {
    console.error("Error fetching song by id:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the song." });
  }
};
