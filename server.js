const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/chuckDB',{useNewUrlParser: true, useMongoClient: true});

const factSchema={
    title: String,
    connect: String
};

const Fact = mongoose.model('Fact', factSchema);

//cheined rout handler
//for all records
app.route('/facts')
.get((req,res)=>{
    Fact.find((error, facts)=>{
        if(!error){
            console.log(facts);
            res.send(facts); 
        } else {
            console.log(error);
        }
    });
})
.post((req,res)=>{
    console.log(req.body.title);
    console.log(req.body.content);     
    //save a new fact by the POST request to the database
    const newFact = new Fact({
        title: req.body.title,
        content: req.body.content
    });

    newFact.save((error) => {
        if(!error){
            res.send('Successfully added a new fact about Chuck Norries')
        }else{
            res.send(error);
        }
    });
})
.delete((req,res)=>{
    Fact.deleteMany((error)=>{
        if(!error){
            res.send('Successfully deleted all facts')
        }else{
            res.send(error);
        }
    });
});

//target a specific fact


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});