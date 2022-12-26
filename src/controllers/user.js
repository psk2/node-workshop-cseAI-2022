const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var mongoose = require('mongoose');

const User = require("../models/user");



exports.signUp = (req, res, next) => {
  User
      .find({ email: req.body.email })
      .exec()
      .then(result => {
          console.log('result', result)
          if (result.length >= 1) {
              res.status(409).json({
                  message: "email id already exists",
                  // existingUser: result
              });
          } else {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                  if (err) {
                      console.log('err', err)
                  } else {
                      const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                      })
                      user.save()
                          .then(result => {
                              console.log('result', result)
                              res.status(201).json({
                                  message: "user created successfully",
                                  createduser: {email: result.email, id: result._id}
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
              })
          }
      })
}

exports.login = (req, res, next) => {
  User
      .find({ email: req.body.email })
      .exec()
      .then(user => {
          // console.log('user', user)
          if (user.length < 1) {
              return res.status(401).json({
                  message: "Auth failed, user not found",
                  data: user
              })
          }
          bcrypt.compare(req.body.password, user[0].password, (err, response) => {
              if (err) {
                  return res.status(401).json({
                      data: err
                  })
              }
              if (response) {
                  const token = jwt.sign({
                      email: user[0].email,
                      userId: user[0].id
                  },
                  "secret",
                  {
                      expiresIn: "1hr"
                  }

                  );
                  return res.status(200).json({
                      message: "Auth Successful",
                      token: token
                  });
              }
              return res.status(401).json({
                  message: "Auth failed",
                  data: response
              });
          })
      })
      .catch(error => {
          console.log('error', error)
          res.status(500).json({
              message: "something went wrong",
              error: error
          });
      })
}