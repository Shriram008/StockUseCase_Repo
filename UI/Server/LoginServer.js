const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const INCRoutes = express.Router();
const PORT = 4000;
let INC = require('./LoginBean');
//let Todo = require('./todo.model');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://admin:admin@ninjaprogram-xlxya.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
var c1, c2, c3 ;
var r1, r2, r3;
var Chart= {};
var status ={}
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");

     var cursor = INC.count({ Gender: "Male" }, (function (err, doc) {

        console.log(doc);

    })
    ) 
    console.log(cursor.doc);

    var cursor_1 = INC.count( (function (err, doc) {

        console.log(doc);

    })
    )


    /* var cursor_1 = INC.find().sort({ INC_RaisedOn: 1 }).toArray (function (err, doc) {

        console.log(doc);


    }) */
    


})

INCRoutes.route('/Chart').get(function (req, res) {
    INC.count({ Gender: "Male" }, function (err, count) {
        if (err) {
            console.log(err);
        } else {
            c1=count
        }
    });
    INC.count({ Gender: "Female" }, function (err, count) {
        if (err) {
            console.log(err);
        } else {
            c2=count
        }
    });
    
    var Gender = {
        high : c1,
        medium: c2,
      
    }

                                   

      







    Chart = Object.assign(Gender)
res.json(Chart);
});

INCRoutes.route('/count').get(function (req, res) {
    INC.count(function (err, count) {
        if (err) {
            console.log(err);
        } else {
            res.json(count);
        }
    });
});

INCRoutes.route('/').get(function (req, res) {
    INC.find(function (err, incs) {
        if (err) {
            console.log(err);
        } else {
            res.json(incs);
        }
    });
});
INCRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    INC.findById(id, function (err, inc) {
        res.json(inc);
    });
});

INCRoutes.route('/add').post(function (req, res) {
    let inctrial = new INC(req.body);
    inctrial.save()
        .then(inctrial => {
            res.status(200).json({ 'ID': 'ID added successfully' });
            res.redirect('/view');
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

//https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

app.use('/ids', INCRoutes);
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});