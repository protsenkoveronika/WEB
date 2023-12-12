const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locationsController.js');

router.get("/allLocations", locationsController.getAllLocations);
router.get("/location/:id", locationsController.getLocationById);
router.post("/createLocation", locationsController.createLocation);
router.delete("/deleteLocation/:id", locationsController.deleteLocationById);
router.put("/updateLocation/:id", locationsController.updateLocationById);

module.exports = router;