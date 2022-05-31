const express = require("express");
var path = require("path");
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/users');
const Product = require('./models/products');
const {render} = require("ejs");
app.use(express.urlencoded({extended: true}));

const UserRoute = require('./routes/UserRoute')
app.use('/',UserRoute)

//connect to mongoDB
const dbURI = 'mongodb+srv://utebag:qwerty123@cluster0.lgklj.mongodb.net/my?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => console.log('Connected to DB!'))
    .catch((err) => console.log(err))



app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));
app.set("public", path.join(__dirname, "public"));
app.set("view engine", "ejs");
app.use("/", require("./routes/root"));
app.use("/home", require("./routes/home"));
app.use("/about", require("./routes/about"));
app.use("/users", require("./routes/users"));


app.get("/register", function(req, res){
    res.render("register");
});



//veiw all users
app.get('/viewUsers', (req, res) => {
    User.find().sort({created: -1})
        .then((result) => {
            res.render('viewUsers', { title: 'Yeragdasfs', users: result})
        })
        .catch((err) => {
            console.log(err);
        })
})


// new user
app.get('/newUser', (req, res) => {
    res.render('newUser', { title: 'Create a new user' });
});

app.post('/viewUsers', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(() => {
           res.redirect('/viewUsers');
        })
        .catch((err) => {
            console.log(err);
        })
})


// find by id
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            res.render('userdet', {user: result, title: 'User Details'})
        })
        .catch((err) => {
            console.log(err);
        });
})


//delete
app.delete('/user/:id', (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/viewUsers' });
        })
        .catch(err => {
            console.log(err);
        });
});



//PRODUCTS


//veiw all product
app.get('/viewProduct', (req, res) => {
    User.find().sort({created: -1})
        .then((result) => {
            res.render('viewProduct', { title: 'All products', products: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

// new Product
app.get('/newProduct', (req, res) => {
    res.render('newProduct', { title: 'Add new product' });
});


app.post('/viewProduct', (req, res) => {
    const product = new Product(req.body);
    product.save()
        .then(() => {
            res.redirect('/viewProduct');
        })
        .catch((err) => {
            console.log(err);
        })
})









app.listen(app.get("port"),function(){
    console.log("App started on port http://localhost:" + app.get("port"));
});

