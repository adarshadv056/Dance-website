const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = 8000;

// this was useless acc to chatgpt and after doing thius code work for every wherr 
// const bodyparser = require("body-parser")
// getting-started.js
// const Address = require("ipaddr.js");
// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// define mongoose schema 
const kittySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', kittySchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("this item has been saved to the database.")
    }).catch(() => {
        res.status(400).send("this was not saved to the database.")
    });
    // res.status(200).render('contact.pug');
});
// ye tha ki kis trahbse mongoose ki madadt se mongodb me data save krr sakte h 

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on  port ${port}`);
});