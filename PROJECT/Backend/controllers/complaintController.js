const db = require("../config/db");

// GET ALL COMPLAINTS
exports.getComplaints = (req, res) => {
    const sql = `
        SELECT
            c.complaint_id,
            c.student_id,
            s.name AS student_name,
            c.complaint_type,
            c.description,
            c.complaint_date,
            c.status
        FROM complaints c
        INNER JOIN students s
            ON c.student_id = s.student_id
        ORDER BY c.complaint_date DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(results);
    });
};