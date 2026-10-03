const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const feeRoutes = require("./routes/feeRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// =========================
// LOGIN / MAIN ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/users", userRoutes);



// =========================
// ROOM OCCUPANTS API
// =========================

app.get("/api/rooms/:roomNumber/occupants", (req, res) => {

    const roomNumber = req.params.roomNumber;

    const sql = `
        SELECT
            s.student_id,
            s.name,
            s.email,
            s.phone,
            ra.room_number,
            ra.allocation_date,
            ra.status
        FROM room_allocation ra
        INNER JOIN students s
            ON ra.student_id = s.student_id
        WHERE ra.room_number = ?
        AND ra.status = 'Active'
    `;

    db.query(sql, [roomNumber], (err, results) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(results);

    });

});


// =========================
// DASHBOARD APIs
// =========================


// Students count
app.get("/api/dashboard/students", (req, res) => {

    const sql = "SELECT COUNT(*) AS count FROM students";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            count: result[0].count
        });

    });

});


// Rooms count
app.get("/api/dashboard/rooms", (req, res) => {

    const sql = "SELECT COUNT(*) AS count FROM rooms";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            count: result[0].count
        });

    });

});


// Allocations count
app.get("/api/dashboard/allocations", (req, res) => {

    const sql = `
        SELECT COUNT(*) AS count
        FROM room_allocation
        WHERE status = 'Active'
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            count: result[0].count
        });

    });

});


// Complaints count
app.get("/api/dashboard/complaints", (req, res) => {

    const sql = `
        SELECT COUNT(*) AS count
        FROM complaints
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            count: result[0].count
        });

    });

});


// =========================
// HOME
// =========================

app.get("/", (req, res) => {

    res.send(
        "Smart Hostel Management System Backend is Running!"
    );

});


// =========================
// SERVER
// =========================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});