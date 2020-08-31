const express = require("express");
const router = express.Router();
const { signUp, signIn, signOut } = require("../controllers/auth");

router.post("/join", signUp);
router.post("/signin", signIn);
router.get("/signut", signOut);
module.exports = router;
