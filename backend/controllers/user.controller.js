/* All the code needed to perform CRUD operations using Mongoose. */
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model.js');

//finds the user from the db matching the username & password entered into the login screen
//returns a token with the user details (only username for now) as payload
exports.findUser = function (req, res) {
    userModel.find({ 'username': req.query.username }, (err, user) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (user.length === 0){
                res.status(404).json('status: 404');
            }
            else {
                let payload = {
                    'username': user[0].username,
                    'role': user[0].role
                }
                const token = jwt.sign(JSON.stringify(payload), 'myverysecretsecret', {algorithm: 'HS256'});
                res.status(200).send({'token': token});    
            }      
        }
    });
};

//returns a list of all users for the admin view
exports.findAllUsers = function(req, res) {
    userModel.find({}, (err, users) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (users.length === 0){
                res.status(404).json('status: 404');
            } else {
                res.status(200).json(users);
            }            
        }
    });
};

// Create and Save a new user with a role according to the User model
exports.createUser = function(req, res) {
    let user = new userModel({
    username: req.query.username,
    role: 'user'
    });

    user.save((err) => {
        if (err) {
            console.log(err)
            res.status(500).json(err);
        } else {
            res.status(200).send();
        }
    });
};

// Delete a user matching the username
exports.deleteUser = function(req, res) {
    userModel.deleteOne({ username: req.query.username }, (err) => {
        if (err) {console.log(err)
            res.status(500).json(err);
        } else {
            res.status(200).send();
        }
    });
};

// Edit user role by matching to username
exports.editUser = function(req, res) {
    userModel.updateOne({ username: req.query.username }, { role: req.query.role }, (err) => {
        if (err) {console.log(err)
            res.status(500).json(err);
        } else {
            res.status(200).send();
        }
    });
};