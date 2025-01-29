const express = require("express");
const movieController = require("../controllers/movieController");
const upload = require("../middleware/fileUpload");

const router = express.Router();

//INDEX
router.get("/", movieController.index);

//SHOW
router.get("/:slug", movieController.show);

// CREAZIONE NUOVO FILM
router.post("/", upload.single("image"), movieController.store);

// SALVATAGGIO NUOVA RECENSIONE
router.post("/:id/reviews", movieController.storeReview);

module.exports = router;