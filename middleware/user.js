const jwt = require('jsonwebtoken');
function userMiddleware (req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    
}

module.exports = {
    userMiddleware
}