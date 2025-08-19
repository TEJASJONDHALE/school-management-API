const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/school.controller");

// Route for adding a new school
router.post("/addSchool", schoolController.addSchool);

// Route for listing schools by proximity
router.get("/listSchools", schoolController.listSchools);

module.exports = router;
