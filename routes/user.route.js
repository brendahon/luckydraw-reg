const express = require('express');
const app = express();
const userRoutes = express.Router();

// Require User model in our routes module
let User = require('../models/User');

// Defined store route
userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body);
  user.save()
    .then(user => {
      console.log("user saved: " + user);
      res.json(user);
    })
    .catch(err => {
      console.log("add user error: " + err);
      console.log("err.message: " + err.message);

      if(err.message.includes("E11000")) {

        res.status(400).send("This email has been registered!");

      } else {

        res.status(400).send("Error in registration, please try again!");
      }

    });
});


// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

// Defined edit route
userRoutes.route('/reset/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
      res.json(user);
  });
});

//  Defined update route
userRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
    if (!user)
      return next(new Error('Could not load Document'));
    else {
        user.unit_name = req.body.unit_name;
        user.unit_price = req.body.unit_price;

        user.save().then(adUnit => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = userRoutes;