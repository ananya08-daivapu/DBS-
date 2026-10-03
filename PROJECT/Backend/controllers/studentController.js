const db = require("../config/db");

// GET ALL STUDENTS
exports.getStudents = (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(results);

    });

};


// ADD STUDENT
exports.addStudent = (req, res) => {

    const {
        student_id,
        name,
        email,
        phone,
        gender,
        room_number
    } = req.body;

    if (!student_id || !name || !email) {
        return res.status(400).json({
            error: "Student ID, name and email are required."
        });
    }

    const sql = `
        INSERT INTO students
        (student_id, name, email, phone, gender, room_number)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            student_id,
            name,
            email,
            phone,
            gender,
            room_number
        ],
        (err) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Student added successfully!"
            });

        }
    );

};


// UPDATE STUDENT
exports.updateStudent = (req, res) => {

    const studentId = req.params.id;

    const {
        name,
        email,
        phone,
        gender,
        room_number
    } = req.body;

    const sql = `
        UPDATE students
        SET name = ?,
            email = ?,
            phone = ?,
            gender = ?,
            room_number = ?
        WHERE student_id = ?
    `;

    db.query(
        sql,
        [
            name,
            email,
            phone,
            gender,
            room_number,
            studentId
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Student not found."
                });
            }

            res.json({
                message: "Student updated successfully!"
            });

        }
    );

};


// DELETE STUDENT
exports.deleteStudent = (req, res) => {

    const studentId = req.params.id;

    const sql = `
        DELETE FROM students
        WHERE student_id = ?
    `;

    db.query(
        sql,
        [studentId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Student not found."
                });
            }

            res.json({
                message: "Student deleted successfully!"
            });

        }
    );

};