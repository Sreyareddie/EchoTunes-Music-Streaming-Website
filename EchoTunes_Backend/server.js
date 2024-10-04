import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRouter.js";
import albumRouter from "./src/routes/albumRouter.js";
import playListRouter from "./src/routes/playListRouter.js";
import userRouter from "./src/routes/userRouter.js";
import searchRouter from "./src/routes/searchRouter.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//init routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/playlist", playListRouter);
app.use("/api/user", userRouter);
app.use("/api/search", searchRouter);

app.get("/", (req, res) => res.send("API working"));
app.listen(port, () => console.log(`Server started on ${port}`));
