// Intentionall throws 500 type error for testing.
exports.errorTest = function(req, res, next) {
    const error = new Error("Server Error");
    // Passing the error to the next middleware
    next(error);  
};
