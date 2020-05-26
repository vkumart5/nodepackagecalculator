var express = require("express");
var router = express.Router();
const { exec } = require("child_process");
const fetch = require('node-fetch');

function getFinalVersions(getVersions){
    var finalVersions = [];
    for(var i=getVersions.length-3; i<getVersions.length; i++){
        finalVersions.push(getVersions[i]);
    }
    //console.log(finalVersions);
    return finalVersions;
}

router.post("/", async function(req, res, next){
    var packageName = req.body.package;
    console.log("packageName   ", packageName);
    exec(`npm view ${packageName} versions  --json`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        if (stdout){
            //console.log(`stdout: ${stdout}`);
            var getVersionsWithSize;
            var getVersions = JSON.parse(stdout);
            getVersions = getFinalVersions(getVersions);

            res.json(getVersions);
        }
    });
});

module.exports=router;