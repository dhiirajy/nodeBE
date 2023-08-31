const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.replace('Bearer ', '') : '';
    const secretKey = "ASDSDWEWE343433434";
    
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
