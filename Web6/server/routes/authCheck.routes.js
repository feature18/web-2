const middlewares = require("../middlewares/auth.middleware");

module.exports = function (app){
    app.get("/auth/requireAuth", [middlewares.verifyToken], (req, res) => {
        res.status(200).send({message: "requireAuth route"});
    });
    app.get("/auth/notRequireAuth",  (req, res) => {
        res.status(200).send({message: "notRequireAuth route"});
    });
    app.post("/auth/checkUser", [middlewares.checkUser], (req, res) => {
       res.status(200).send({message: "checkUser route"});
    });
}