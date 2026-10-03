const db = require("../config/db");

exports.login = (req, res) => {

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            error: "Please fill all the fields."
        });
    }

    const sql = `
        SELECT user_id, email, role, student_id
        FROM users
        WHERE email = ?
        AND password = ?
        AND role = ?
    `;

    db.query(
        sql,
        [email, password, role],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    error: "Invalid email, password or role."
                });
            }

            res.json({
                message: "Login successful!",
                user: results[0]
            });

        }
    );

};