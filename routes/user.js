const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const postModel = require("../models/posts");
router.get("/new", async (req, res) => {
  try {
    res.render("createUser");
  } catch (err) {
    console.log(err);
  }
});
router.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByPk(id);
    res.render("createUser", { user });
  } catch (err) {
    console.log(err);
  }
});
router.post("/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByPk(id);
    if (user) {
      (user.name = req.body.name), (user.email = req.body.email);
      await user.save();
    }
    res.render("user", { user });
  } catch (err) {
    console.log(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await userModel.findAll();
    await res.render("users", { users });
  } catch (err) {
    console.log(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findByPk(userId, {
      include: [postModel],
    });
    if (!user) return res.send("User not found");
    res.render("user", { user });
  } catch (err) {
    console.log(err);
  }
});

router.post("/new", async (req, res) => {
  try {
    const user = req.body;
    await userModel.create({
      name: user.name,
      email: user.email,
    });
    res.redirect("/users");
  } catch (err) {
    console.log(err);
  }
});
router.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await userModel.destroy({ where: { id } });
  res.redirect("/users");
});

module.exports = router;
