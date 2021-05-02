const express = require("express");
const user = require("../controllers/user.controller.js");
router = express.Router();

//we use a router to get the inputs as parameters and make that the result
router.get("/all", user.findAllUsers);

router.put("/edit", user.editUser);

router.delete("/delete", user.deleteUser);

router.post("/register", user.createUser);

router.get("/login", user.findUser);

module.exports = router;
