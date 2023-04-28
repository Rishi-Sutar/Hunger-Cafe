const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');

require('dotenv').config({path:'views/.env'});

const PORT = process.env.PORT || 8080;

// const {MongoClient} = require('mongodb');

const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.kaq6g3b.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
  );


// mongoose.connect(uri);


// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri =`mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.kaq6g3b.mongodb.net/?retryWrites=true&w=majority`;
 

//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

app.use(express.static(path.join('views')));
app.use(express.static(path.join('assets')));
app.use(express.static(path.join('node_modules')));

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get('/',(req,res) => {

        res.sendFile('/views/index.html',(err) =>{
            if(err){
                console.log(err);
            }
            else{
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end();    
            }
        });

})


// app.get('/about',(req,res) => {
//     res.sendFile('/views/about.html');
// })

// app.get('/contact',(req,res) => {
//     res.sendFile('/views/contact.html');
// })

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