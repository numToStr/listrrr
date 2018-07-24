const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require("./server/config/keys/index");

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
