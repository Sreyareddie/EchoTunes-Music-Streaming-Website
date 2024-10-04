import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  album: { type: String, required: true },
  image: { type: String, required: true },
  audio: { type: String, required: true },
  duration: { type: String, required: true },
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlist",
    default: null,
  },
});

const songModel = mongoose.model.song || mongoose.model("song", songSchema);

export default songModel;
