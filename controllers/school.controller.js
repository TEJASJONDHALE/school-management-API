const Joi = require("joi");
const schoolService = require("../services/school.service");

// Validation schema for adding a school
const addSchoolSchema = Joi.object({
	name: Joi.string().min(3).required(),
	address: Joi.string().min(5).required(),
	latitude: Joi.number().min(-90).max(90).required(),
	longitude: Joi.number().min(-180).max(180).required(),
});

// Validation schema for listing schools
const listSchoolsSchema = Joi.object({
	lat: Joi.number().min(-90).max(90).required(),
	lon: Joi.number().min(-180).max(180).required(),
});

class SchoolController {
	async addSchool(req, res) {
		try {
			const { error, value } = addSchoolSchema.validate(req.body);
			if (error) {
				return res
					.status(400)
					.json({ message: "Invalid input data", details: error.details });
			}

			const newSchool = await schoolService.createSchool(value);
			res
				.status(201)
				.json({ message: "School added successfully!", data: newSchool });
		} catch (error) {
			console.error("Error adding school:", error);
			res.status(500).json({ message: "An error occurred on the server." });
		}
	}

	async listSchools(req, res) {
		try {
			const { error, value } = listSchoolsSchema.validate(req.query);
			if (error) {
				return res
					.status(400)
					.json({
						message: "Invalid latitude or longitude provided.",
						details: error.details,
					});
			}

			const { lat, lon } = value;
			const schools = await schoolService.findSchoolsByProximity(lat, lon);
			res.status(200).json({ data: schools });
		} catch (error) {
			console.error("Error listing schools:", error);
			res.status(500).json({ message: "An error occurred on the server." });
		}
	}
}

module.exports = new SchoolController();
