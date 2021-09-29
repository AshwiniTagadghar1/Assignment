const express = require('express');
const router = express.Router();
const College = require('../models/colleges')
const Student = require('../models/students')
require('dotenv').config();


var MongoClient = require('mongodb').MongoClient;
var url = process.env.REACT_APP_MONGODB_URI;


router.get('/college',function(req,res,next){
    College.find({}).then(function(colleges){
        res.send(colleges);
    }).catch(next);   
});




router.get('/student',function(req,res,next){
  
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var final_res = {}
    const url_idc = parseInt(req.url.split('?id=')[1]);
 
    dbo.collection('students').aggregate([ 
        { $lookup:
           {
             from: 'colleges',
             localField: 'college_id',
             foreignField: 'id',    
             as: 'nameOfcollege'
           }
         },{ $match : {college_id: url_idc }}
        ]).toArray(function(err, resu) {
        if (err) throw err;
        console.log(resu[0].nameOfcollege.id) 
        res.send(resu); 
    
      }); 
   
  });
});
  
   



module.exports = router;

