const db = require("../config/db");

// GET ALL FEE RECORDS
exports.getFees = (req, res) => {
    const sql = `
        SELECT
            fp.payment_id,
            fp.student_id,
            s.name AS student_name,
            fp.amount,
            fp.payment_date,
            fp.payment_method,
            fp.status
        FROM fee_payment fp
        INNER JOIN students s
            ON fp.student_id = s.student_id
        ORDER BY fp.payment_date DESC
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