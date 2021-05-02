/* All the code needed to perform CRUD operations using Mongoose. */
const Favourite = require('../models/favourite.model.js');
const mongoose = require('mongoose');

//find all the items in the db matching the username
exports.findFavouriteList = function (req, res) {
    Favourite.find({ 'username': req.params.username }, (err, favouriteList) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (favouriteList.length === 0){
                res.status(404).json('status: 404');
            } else {
                console.log(favouriteList)
                res.status(200).json(favouriteList);
            }            
        }
    });
};

// Add a favourite to the users list of favourites matching the username
exports.addFavourite = function(req, res) {
    let favouriteModel = new Favourite({
    username: req.query.username,
    id: req.query.id,
    title: req.query.title,
    image: req.query.image,
    year: req.query.year
    });

    favouriteModel.save((err) => {
        if (err) {console.log(err)
            res.status(500).json(err);
        } else {
            res.status(200).send();
        }
    });
};

// Delete a favourite matching the username
exports.deleteFavourite = function(req, res) {
    console.log(req.params._id)
    Favourite.deleteOne({ _id: req.params._id }, (err) => {
        if (err) {console.log(err)
            res.status(500).json(err);
        } else {
            res.status(200).send();
        }
    });
};
