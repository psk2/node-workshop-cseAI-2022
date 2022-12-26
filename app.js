const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose')


mongoose.set('strictQuery', false);
// This means that, by default, Mongoose will filter out query filter properties that are not in the schema.
mongoose.connect('mongodb://127.0.0.1:27017/college');

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.json()) looks at requests where the Content-Type: application/json header is present and transforms the text-based JSON input into JS-accessible variables under req.body. app.use(express.urlencoded({extended: true}) does the same for URL-encoded requests. the extended: true precises that the req.body object will contain values of any type instead of just strings.



// Adding the modules
const userRoutes = require('./src/routes/user');
const studentRoutes = require('./src/routes/student');

app.use('/user', userRoutes)
app.use('/student', studentRoutes)


app.get("/", (req, res)=>{
  res.json({response: "You can't get Anything..!!"});
})


app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;
// git push https://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@github.com/psk2/node-workshop-cseAI-2022.git
