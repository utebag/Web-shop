const User = require('../models/users')
//level 4
const bcrypt = require("bcrypt");
const {hash} = require("bcrypt");


exports.register = async (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const user = new User({
            email: req.body.username,
            password:hash
        });
        user.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.render("login");
            }
        });
    })
};

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    user.findOne({email: username}, function(err, foundUser){
        if (err) {
            res.send("404")
        } else {
            if (foundUser) {
                bcrypt.compare(password, hash, function(err, result) {
                    if(result===true) {
                        res.render("register");
                    }
                });
            }
        }
    })

};