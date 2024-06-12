// const sessionToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "Secret1@!";

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
};

const getUser = (token) => {
  if(!token) return null;
  return jwt.verify(token, secret);
};

module.exports = { setUser, getUser };
