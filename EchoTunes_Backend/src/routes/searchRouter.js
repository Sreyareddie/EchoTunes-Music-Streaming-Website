import express from "express";
import albumModel from "../models/albumModel.js"; // Adjust path as needed
import songModel from "../models/songModel.js"; // Adjust path as needed

const router = express.Router();

// Search API Route
router.get("/", async (req, res) => {
  const { q } = req.query; // Extract the search query from the request

  try {
    // Search both albums and songs using regex (case-insensitive)
    const albums = await albumModel.find({
      name: { $regex: q, $options: "i" },
    });
    const songs = await songModel.find({ name: { $regex: q, $options: "i" } });

    // Combine results from both models
    const results = [
      ...albums.map((album) => ({
        id: album._id,
        title: album.name,
        type: "album",
      })),
      ...songs.map((song) => ({
        id: song._id,
        title: song.name,
        type: "song",
      })),
    ];

    // Send results as response
    res.json({ results });
  } catch (error) {
    console.error("Error in search route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
