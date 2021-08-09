const app = require("./app");

require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => [
  console.log("Mongoose connection ERR : " + err.message),
]);

mongoose.connection.once("open", () => {
  console.log("MongodB connected successfully");
});

//bringing the models

require("./models/chatroom");
require("./models/user");
require("./models/message");

app.listen(3001, () => {
  console.log("server running at port 3001");
});
