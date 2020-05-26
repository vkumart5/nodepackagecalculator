var express = require("express");
var router = express.Router();

router.get("/", async function(req, res, next){
    res.send("The Test GET API is working fine");
});

router.post("/", function(req, res, next){
    var test = req.body.package;
    console.log(test);
    res.json("['name':'Vinod']");
});

module.exports=router;