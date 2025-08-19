const { pool } = require("../utils/db");

class SchoolService {
	async createSchool({ name, address, latitude, longitude }) {
		const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
		const [result] = await pool.query(sql, [
			name,
			address,
			latitude,
			longitude,
		]);
		return { id: result.insertId, name, address, latitude, longitude };
	}

	/**
	 * Finds schools and sorts them by proximity to a given location using the Haversine formula.
	 * @param {number} userLat - The user's latitude.
	 * @param {number} userLon - The user's longitude.
	 * @returns {Promise<Array>} A sorted list of schools.
	 */
	async findSchoolsByProximity(userLat, userLon) {
		// 6371 is the radius of the Earth in kilometers.
		const sql = `
      SELECT
        id, name, address, latitude, longitude,
        ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance_km
      FROM schools
      ORDER BY distance_km ASC;
    `;

		const [schools] = await pool.query(sql, [userLat, userLon, userLat]);
		return schools;
	}
}

module.exports = new SchoolService();
