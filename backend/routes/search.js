const express = require("express");
router = express.Router();
const fetch = require("node-fetch");
const apikey = "70414011"; //todo move to env

//we use a router to get the category, term and limit the user inputs as parameters and make that the
//result, the return that as JSON when we get the response from the API
router.get("/:term", async function (req, res, next) {
  await fetch(`http://www.omdbapi.com/?&apikey=` + apikey + `&type=movie&s=` + req.params.term)
    .then(res => res.json())
    .then(result => {
      res.json(result);
    });
});

router.get("/movie/:id", async function (req, res, next) {
  console.log(req.params.id)
  await fetch(`http://www.omdbapi.com/?apikey=` + apikey + `&type=movies&i=` + req.params.id)
  .then(res => res.json())
  .then(result => {
    res.json(result);
  });
});

module.exports = router;
