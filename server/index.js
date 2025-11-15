import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;

// Needed to convert __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Database Connection
import connect from "./config/database.js";

connect
	.then(() => {
		console.log("Connected Successfully to MongoDB server");
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

// Routes (all ES module imports)
import userRoutes from "./routes/user.js";
import ratingsRoutes from "./routes/ratings.js";
import contentRoutes from "./routes/content.js";
import watchHistoryRoutes from "./routes/watchHistory.js";
import commentRoutes from "./routes/comment.js";
import discussionRoutes from "./routes/discussion.js";

// Route usage
app.use("/user", userRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/discuss", discussionRoutes);
app.use("/content", contentRoutes);
app.use("/history", watchHistoryRoutes);

// Static file route for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
	res.json("Hello World!");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
