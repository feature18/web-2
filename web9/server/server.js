const express = require('express')
const app = express()
const cors = require('cors');
const port = 8080

app.use(cors());

app.use(express.json());

const dbConfig = require("./config/db.config");

const db = require("./models");
const User = db.user;

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB is connected");
    initial();
}).catch((err) => {
    console.log("Couldn't connect to the DB");
    console.log(err);
    process.exit();
})

function initial(){
    User.estimatedDocumentCount().then((usersCount, err)=>{
        console.log("Users count is ", usersCount);
        if(!err && usersCount === 0){
            new User({username: "Admin",
            nickname: "Admin",
            email: "Admin",
            password: "root"}).save().then((usersCount, err) => {
                if(err){
                    console.log("Admin is not created", err)
                }
                else{
                    console.log("Admin is created")
                }
            })
        }
    }).catch((err) => {
        console.log(err);
    })
}

require("./routes/auth.routes")(app);
require("./routes/authCheck.routes")(app);
require("./routes/chats.routes")(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

