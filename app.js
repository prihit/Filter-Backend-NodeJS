var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/filtering", {useNewUrlParser: true});

var filterSchema = new mongoose.Schema({
    talent: String,
    position: String,
    availability: String,
    job_location: String,
    job_type: String,
    Industry: String,
    top_skill: String,
});

var filter = mongoose.model("filter",filterSchema);

filter.create({
    talent: "Web Development",
    position: "Head",
    availability: "Available",
    job_location: "Pune",
    job_type: "Both",
    Industry: "Textile",
    top_skill: "Creative",
})
app.use(express.json())

app.listen('8000', process.env.IP, function(){
    console.log("Server Running ");
});

app.get('/',function(req,res){
    // res.send("hii")
    console.log("hit")
})
app.get('/filters',function(req,res){
    var dict = {}
    var a = req.body;
    for(var x in a){
        if(a[x]){
            dict[x] = a[x];
        }
    }
    console.log(dict);
    filter.find( dict,function(err, filte){
        if(err){
            console.log(err);
        }else{
            console.log(filte);
        }
    })
        res.send("page")
        });