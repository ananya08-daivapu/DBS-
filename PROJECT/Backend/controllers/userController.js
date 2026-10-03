const db = require("../config/db");

exports.getUsers = (req, res) => {

    const sql = `
        SELECT
            user_id,
            email,
            role,
            student_id
        FROM users
        ORDER BY user_id
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