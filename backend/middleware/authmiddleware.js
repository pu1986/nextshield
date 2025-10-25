const jwt = require('jsonwebtoken');
const authmiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token) return res.status(401).json({ msg: "No Token, Authorization Denied" });
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.id;
        next();
    }catch (errro) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}
module.exports = authmiddleware;