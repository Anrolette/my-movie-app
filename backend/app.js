const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");

app.use(helmet());

// we use the backend - from search.js to get result from the iStore
app.use("/search/", require("./routes/search"));
app.use('/users/', require('./routes/home'))
app.use('/favourite/', require('./routes/favourite'))

//to your database from Atlas>Connect from your app.
const uri = "mongodb+srv://Anrolette:Hollamby@hypdevl3t5.b9yaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useUnifiedTopology: true,
	useNewUrlParser: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// To get the port number from the environment variables instead of hard coding it, we use the following code:
var server_port = process.env.YOUR_PORT || process.env.PORT || 3001;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});

