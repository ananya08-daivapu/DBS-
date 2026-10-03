const express = require("express");

const router = express.Router();

const db = require("../config/db");


/* GET ALL ROOMS */

router.get("/", (req, res) => {

    const sql = "SELECT * FROM rooms";

    db.query(sql, (err, results) => {

        if (err) {

            return res.status(500).json({
                error: err.message
            });

        }

        res.json(results);

    });

});


module.exports = router;