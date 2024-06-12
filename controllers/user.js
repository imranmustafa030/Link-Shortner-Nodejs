const { User } = require("../models/user");
const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const data = req.body;
  const required = ["name", "email", "password"];

  for (let key of required)
    if (
      !data[key] ||
      data[key] == "" ||
      data[key] == undefined ||
      data[key] == null
    )
      return res.render("signup");

  const result = await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.render("login");

  const token = setUser(user);

  res.cookie("token", token);
  return res.redirect("/")
};

module.exports = { handleUserSignup, handleUserLogin };
