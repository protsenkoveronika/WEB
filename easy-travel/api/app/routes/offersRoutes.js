const express = require('express');
const router = express.Router();
const offersController = require('../controllers/offersController.js');

router.get("/allOffers", offersController.getAllOffers);
router.get("/offer/:id", offersController.getOfferById);
router.post("/createOffer", offersController.createOffer);
router.delete("/deleteOffer/:id", offersController.deleteOfferById);
router.put("/updateOffer/:id", offersController.updateOfferById);
router.get("/offersByCategory/:categoryName", offersController.getOffersByCategory);


module.exports = router;