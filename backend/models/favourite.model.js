const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let favoriteSchema = new Schema({  
    username: String,
    id: String,
    title: String,
    image: String,
    year: String
},
{ collection : 'Favourites' });
favoriteSchema.index({username: 1, id: 1}, {unique: true});

module.exports = mongoose.model("Favourites", favoriteSchema);