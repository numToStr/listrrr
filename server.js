const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require("./server/config/keys/index");

/* Routes imports */
const user = require("./server/routes/user");
const todo = require("./server/routes/todo");

/* Express Middlewares */
require("./server/middlewares/express")(app);

/* Serving build files if production */
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "client/build")));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client/build", "index.html"))
	);
}

/**
 * First create a folder name db in C:\mongodb\data\
 *
 * cmd: "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --port 27017 --dbpath C:\mongodb\data\db
 */

/* Connecting MonogoDB */
mongoose
	.connect(
		MONGO_URI,
		{
			useNewUrlParser: true
		}
	)
	.then(() => console.log("MongoDB successfully connected!"))
	.catch(e => console.log(e));

/* Firing up Server */
app.listen(PORT, () => {
	console.log(`Server is up on port: ${PORT}`);
});

/* Registering Routes */
app.use("/api/user", user);
app.use("/api/todo", todo);
