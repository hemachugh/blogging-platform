const express = require("express");
const path = require("path");
const app = express();
const database = require("./database");

const userModel = require("./models/users");
const postModel = require("./models/posts");
const commentModel = require("./models/comments");
const rootRoute = require("./routes/root");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public", "styles")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
userModel.hasMany(postModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
postModel.belongsTo(userModel);
userModel.hasMany(commentModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.belongsTo(userModel);
postModel.hasMany(commentModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.belongsTo(postModel);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/", rootRoute);
database
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
