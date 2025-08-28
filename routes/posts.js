const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const postModel = require("../models/posts");
const commentModel = require("../models/comments");
router.get("/", async (req, res) => {
  try {
    const posts = await postModel.findAll({
      include: [
        { model: userModel }, // the post author
        {
          model: commentModel, // the comments
          include: [userModel], // include user info for each comment
        },
      ],
    });

    res.render("posts", { posts });
  } catch (err) {
    console.log(err);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel.findByPk(id, { include: [userModel] });
    if (!post) return res.status(404).send("Post not found");
    const user = post.User;
    res.render("createPost", { mode: "edit", post, user });
  } catch (err) {
    console.log(err);
  }
});
router.post("/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel.findByPk(id);
    if (post) {
      (post.Title = req.body.title), (post.Content = req.body.content);
      await post.save();
      res.redirect("/posts");
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/new/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByPk(id);
  res.render("createPost", { mode: "create", user });
});
router.post("/create/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByPk(id);
  if (!user) {
    return res.send("User not found");
  }
  const postcreated = await user.createPost({
    Title: req.body.title,
    Content: req.body.content,
  });
  console.log(postcreated);

  res.redirect(`/users/${id}`);
});
router.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await postModel.destroy({ where: { id } });
  res.redirect("/posts");
});
module.exports = router;
