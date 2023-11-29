var express = require('express')
var app = express();
var Port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');                                                                                                                  
const url = "mongodb://mongo:27017"
const client = new MongoClient(url);
const dbName = "angulardb";

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req,res){
    res.send('welcome to js express and angular')
});

app.post('/save', async function(req,res){
    try {
         await client.connect();
         const db         = client.db(dbName);
         const collection = db.collection('contactdetails');
         collection.insertOne(req.body);
         res.status(200).send({success:'success'})
        } catch (err) {
         console.log(err);
         res.status(500).send({error: err.stack})
     }
});

app.get('/alldata', async function(req,res){
    try {
        await client.connect();
        const db         = client.db(dbName);
        const collection = db.collection('contactdetails');
        const data       = await collection.find({}).toArray();
        res.json(data);
        await client.close();
      } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
      }
})

app.listen(Port, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", Port);
  });
  