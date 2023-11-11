const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({message: "No token provided"});
    }

    jwt.verify(token, "some secret", (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized"});
        }
        else {
            req.userId = decoded.id;
            next();
        }
    })
}

const db = require("../models");

const checkUser = (req, res, next) => {
    db.user.findOne({email: req.body.email}).then((user, err) => {
        if(err) {
            return res.status(500).send({message: err});
        }
        if (!user) {
            next();
        }
        else {
            return res.status(401).send({message: "User is already exists"});
        }
    })
}

module.exports = {
    verifyToken,
    checkUser
}