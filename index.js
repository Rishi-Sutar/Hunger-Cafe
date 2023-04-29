const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');

require('dotenv').config({path:'views/.env'});

const PORT = process.env.PORT || 8080;

const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.kaq6g3b.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
  );

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/assets'));


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get('/',(req,res) => {

        res.sendFile(__dirname + '/views/index.html',(err) =>{
            if(err){
                console.log(err);
            }
        });

})


app.get('/about',(req,res) => {
    res.sendFile(__dirname +'/views/about.html');
    console.log('hii');
})

app.get('/contact',(req,res) => {
    res.sendFile(__dirname +'/views/contact.html');
})

app.get('/menu',(req,res) => {
    res.sendFile(__dirname +'/views/menu.html');
})

const tableSchema = new mongoose.Schema({
    guestNumber:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    }
});

const Book = mongoose.model('Book',tableSchema);

app.post("/saveData", (req,res) =>{

        const book = new Book({
            guestNumber:req.body.guestNumber,
            date:req.body.date,
            time:req.body.time
        });
        book.save();
        res.redirect('back');

});

const contactSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    telnum:{
        type:Number,
        required:true
    },
    emailid:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
});

const Contact = mongoose.model('Contact',contactSchema);

app.post('/contact/send',(req,res) => {

        const contact = new Contact({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            telnum:req.body.telnum,
            emailid:req.body.emailid,
            feedback:req.body.feedback
        });
        contact.save();
    
        res.redirect('back');
})


app.listen(PORT,(err) => {
    if(err)console.log(err);
    console.log(`Listening on http://localhost:${PORT}`)
});

module.exports = app;