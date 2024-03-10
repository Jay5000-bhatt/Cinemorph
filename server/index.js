const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // for parsing application/json

// Database Connection Start
const connect = require("./config/database");
connect
  .then(() => {
    console.log("Connected Successfully to MongoDB server");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
// Database Connection End

// Routes 
const userRoutes = require("./routes/user");
const ratingsRoutes = require("./routes/ratings");
const contentRoutes = require("./routes/content");
const watchHistoryRoutes = require("./routes/watchHistory");
const commentRoutes = require("./routes/comment");
const discussionRoutes = require("./routes/discussion");

app.use("/user", userRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/discuss", discussionRoutes);
app.use("/content", contentRoutes);
app.use("/history", watchHistoryRoutes);
app.use("/uploads", express.static(__dirname + "/uploads"));
//Routes End

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


  // {
  //   origin: ["https://cinemorph-git-master-jay-bhatts-projects.vercel.app"],
  //   methods: ["POST", "GET"],
  //   credentials: true
  // }
