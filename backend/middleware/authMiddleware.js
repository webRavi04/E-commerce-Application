// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../config/config');

// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden' });
//         }
//         req.user = decoded;
//         next();
//     });
// };

// module.exports = authMiddleware;


// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
