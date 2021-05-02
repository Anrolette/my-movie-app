/* A schema describes what data is in a database and how it is organised and structured.  */
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema({  
    username: String,
    role: String
},
{ collection : 'Users' });

/*Models are special constructors that are compiled based on the schemas you have defined. */
module.exports = mongoose.model("Users", userSchema);