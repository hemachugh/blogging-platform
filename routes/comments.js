const express = require("express");
const route = express.Router();
const postModel = require("../models/posts");
const commentModel = require("../models/comments");

route.post("/create/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const post = await postModel.findByPk(id, { include: [commentModel] });
  await post.createComment({
    comment: body.content,
    UserId: id,
  });
  res.redirect("/posts");
});

route.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const updatedComments = await commentModel.destroy({ where: { id } });
  res.redirect("/posts");
});
module.exports = route;
