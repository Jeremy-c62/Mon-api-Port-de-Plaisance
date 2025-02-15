const jwt = require('jsonwebtoken');
const KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, KEY)
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();

    } catch (error) {
        res.status(401).json({ error })

    }

}