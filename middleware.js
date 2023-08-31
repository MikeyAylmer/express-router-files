const ExpressError = require('./expressError');

// function to print out request objects.
function logger(req, res, next) {
    console.log(`Recieved a: ${req.method} request to ${req.path}.`)
    return next();
}

// function to check for password
function checkForPassword(req, res, next) {
    try {
        if (req.query.password !== "monkeybreath") {
            throw new ExpressError("Missing password", 402);
        } else {
            return next()
        }
    } catch (e) {
        return next(e)
    }
}
module.exports = { logger, checkForPassword }