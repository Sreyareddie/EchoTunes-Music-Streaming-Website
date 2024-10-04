import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  bgColor: { type: String, required: true },
  image: { type: String, required: true },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "song",
    },
  ],
});

const playListModel =
  mongoose.model.playlist || mongoose.model("playlist", playListSchema);

export default playListModel;
