const express = require("express");
const router = express.Router();
const {login, processLogin, profile} = require("../controllers/users");
// const userLoggedMiddleware = require("../middleware/userLoggedMiddleware");

router.get("/login", login);
router.post("/login", processLogin);

// router.get("/profile", userLoggedMiddleware, profile);

module.exports = router;
