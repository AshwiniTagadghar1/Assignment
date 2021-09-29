const express = require('express');
const router = express.Router();
const College = require('../models/colleges')
const Student = require('../models/students')
require('dotenv').config();


var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;


router.get('/college',function(req,res,next){
    College.find({}).then(function(colleges){
        res.send(colleges);
    }).catch(next);   
});




router.get('/student',function(req,res,next){
  
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    const url_idc = parseInt(req.url.split('?id=')[1]);
    var queryc = { id: url_idc};
    dbo.collection('students').aggregate([ 
        { $lookup:
           {
             from: 'colleges',
             localField: 'college_id',
             foreignField: 'id',
             as: 'nameOfcollege'
           }
         }
        ]).toArray(function(err, resu) {
        if (err) throw err;
        console.log(resu[0].name); 
        res.send(resu);
        
      }); 
    // const url_id = parseInt(req.url.split('?id=')[1]);
    // var query = { college_id: url_id};
    // dbo.collection("students").find(query).toArray(function(err, result) {
    //   if (err) throw err;
    //     res.send(result)
    // });
  });
});
  
   
//    Student.find(query).then(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     res.send(result);
        
//         //res.send(result);
//     }).catch(next);
// });

/*
router.post('/colleges', function(req, res){
    res.send({
        type: 'POST',
        name: req.body.name,
        roll: req.body.roll
    });
});
*/

module.exports = router;

