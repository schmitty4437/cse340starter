// Intentionall throws 500 type error for testing.
exports.errorTest = function(req, res, next) {
    const error = new Error("Server Error");
    next(error);  // Passing the error to the next middleware
};
