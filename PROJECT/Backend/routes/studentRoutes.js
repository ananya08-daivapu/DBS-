const express = require("express");

const router = express.Router();

const studentController =
    require("../controllers/studentController");


// GET students
router.get("/", studentController.getStudents);


// ADD student
router.post("/", studentController.addStudent);


// UPDATE student
router.put("/:id", studentController.updateStudent);


// DELETE student
router.delete("/:id", studentController.deleteStudent);


module.exports = router;