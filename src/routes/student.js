const express = require("express");
const router = express.Router();
const checkAuth =require('../middleware/checkAuth');
const studentController = require("../controllers/student");



router.get("/get", studentController.getAllStudents);
// router.get("/get", checkAuth, studentController.getAllStudents);

router.get("/:studentId", studentController.getStudentById);

router.post("/new", studentController.createStudent);

router.put('/:studentId', studentController.updateStudent);

router.delete("/:studentId", studentController.deleteStudent);

module.exports = router;
