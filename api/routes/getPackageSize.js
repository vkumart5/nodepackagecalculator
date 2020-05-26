var express = require("express");
var router = express.Router();
var getSizes = require("package-size");
const fetch = require('node-fetch');

async function getPackageSize(getVersions){
    var package = [];

    for(i=0; i<getVersions.length; i++){
        await getSizes(getVersions[i])
        .then(data => {
            package.push(data);
        });
    }
    return package;
}

router.post("/", async function(req, res, next){
    console.log("Request Body", req.body);
    var packageName = req.body.package;
    console.log(packageName);

    const bodyAPI = req.body;
    var getVersions;
    await fetch('http://localhost:9000/getPackageVersions', {
        method: 'post',
        body:    JSON.stringify(bodyAPI),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
        //console.log("JSON   ", json);
        getVersions = json;
    });

    for(i=0; i<getVersions.length; i++){
        getVersions[i] = `${packageName}@${getVersions[i]}`;
    }

    console.log("getVersions   ", getVersions);

    var packageSize = await getPackageSize(getVersions);
    console.log(packageSize);
    res.json(packageSize);
});

module.exports=router;