const express = require("express");
const passport = require("passport");
const isAuth = passport.authenticate("jwt", { session: false });
const { getAllUsers, getUser, editProfile } = require("../controllers/user");
const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", isAuth, getUser);
router.put("/user/:userId", isAuth, editProfile);
module.exports = router;
