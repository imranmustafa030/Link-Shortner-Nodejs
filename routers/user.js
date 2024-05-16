const express = require("express");
const router = express.Router();
const {handleUserLogin, handleUserSignup} = require("../controllers/user")

router.post("/", handleUserSignup)
router.post("/login", handleUserLogin)

module.exports = router;
