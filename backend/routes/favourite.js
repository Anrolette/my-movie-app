const express = require("express");
const favourite = require("../controllers/favourite.controller.js");
router = express.Router();

//we use a router to get the inputs as parameters and make that the result
router.get("/all/:username", favourite.findFavouriteList);

router.delete("/delete/:_id", favourite.deleteFavourite);

router.post("/add", favourite.addFavourite);

module.exports = router;
