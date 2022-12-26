const Student = require("../models/student");
exports.getAllStudents = (req, res, next) => {
  Student.find()
    .exec()
    .then((result) => {
      response = {
        count: result.length,
        data: result,
      };
      res.status(201).json(response);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
};

exports.createStudent = (req, res, next) => {
  console.log("req.body: ", req.body);
  var student = new Student({
    ...req.body,
  });
  student
    .save()
    .then((result) => {
      console.log("result", result);
      res.status(200).json({
        message: "Student saved successfully",
        studentDetails: result,
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
};


exports.updateStudent =  (req, res, next) => {
  console.log('req', req.body)
  const id = req.params.studentId;
  const updateObj = {};
  for (let ops of Object.keys(req.body)) {
    console.log('ops: ', ops);
      updateObj[ops] = req.body[ops]
  }

  // for (const key of Object.keys(input)) {
  //   console.log(key, input[key]);
  // }
  console.log('updateObj', updateObj)
  
  Student.updateOne(
      {
          _id: id
      },
      {
          $set: updateObj
      }

  )
      .exec()
      .then(result => {
          console.log('result', result)
          res.status(201).json({
              message: "Student Updated",
              updatedStudent: result
          });
      })
      .catch(error => {
          console.log('error', error)
          res.status(500).json({
              message: "something went wrong",
              error: error
          });
      })
}

exports.getStudentById = (req, res, next) => {
  const id = req.params.studentId;
  console.log("id: ", id);
  Student.findById(id)
    .exec()
    .then((student) => {
      console.log("Student", student);
      console.log("Student length", student.length);
      if (student) {
        return res.status(200).json({
          message: "Student found",
          data: student,
        });
      } else {
        return res.status(200).json({
          message: "Student Not found",
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
};

exports.deleteStudent = (req, res, next) => {
  const id = req.params.studentId;
  Student.remove({ _id: id })
    .exec()
    .then((result) => {
      console.log("result", result);
      if (result)
        res.status(201).json({
          message: "success",
          data: result,
        });
      else {
        res.status(404).json({
          message: "No data found for the given ID",
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    });
};
