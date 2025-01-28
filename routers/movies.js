const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

//INDEX
router.get("/", movieController.index);

//SHOW
router.get("/:slug", movieController.show);

// SALVATAGGIO NUOVA RECENSIONE
router.post("/:id/reviews", movieController.storeReview);

module.exports = router;