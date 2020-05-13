const fs = require("fs");
module.exports = function(app){
    fs.readFile("../../../db/db.json", (err,data)=>{
        if(err) throw err;
        let parsed = JSON.parse(data);
        console.log(parsed);
        console.log("JSON file has been read 1");
    });
}
