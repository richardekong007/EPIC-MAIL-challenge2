import jwt from "jsonwebtoken";

const secret = '45erkjherht45495783';


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.decodedToken = jwt.verify(token, secret);
        next();
    } catch (error) {
        let status = 401;
        return res.status(status).send({status: status, data :[], message: 'Authentication failed'});
    }
};

