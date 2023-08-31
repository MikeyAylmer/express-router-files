// import express.
const express = require('express');

// import ExpressError.
const ExpressError = require('./expressError');

// import middleware
const middleware = require('./middleware');

// import user routes from file.
const userRoutes = require('./userRoutes');

// import external middleware morgan.
const morgan = require('morgan');

// set app to express.
const app = express();

app.use(express.json());
// app.use is a way of telling express heres some code i want to run on every request.
// app.use(middleware.logger)
// app.use morgan
app.use(morgan('dev'));

// users is for the userRoutes file routes.
app.use('/users', userRoutes)
// handle no favicon
app.get('/favicon.ico', (req, res) => { res.sendStatus(204) })

// middleware route function passed in as second argument.
app.get('/secret', middleware.checkForPassword, (req, res, next) => {
    // try {
    //     if (req.query.password !== "monkeybreath") {
    //         throw new ExpressError("Missing password", 402);
    //     }
    return res.send("I LOVE YOU!")
    // } catch (e) {
    //     return next(e)
    // }

})

// 404 handler
app.use(function (req, res) {
    return new ExpressError("Not Found", 404)
});

// generic error handler
app.use(function (err, req, res, next) {
    // the defualt status is 500 Internal Server Error
    let status = err.status || 500;

    // set the status and alert the user
    return res.status(status).json({
        error: {
            message: err.msg,
            status: status
        }
    });
});


// set port
app.listen(3000, () => {
    console.log("App Port on 3000 ");
})