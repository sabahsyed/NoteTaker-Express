const fs  = require("fs");
var updatedArray = require("../db/db.json")

module.exports = function(app){
    //SAVE a new note
    app.get("/api/notes", function(req,res){
        console.log("***Inside SAVE ***");
        fs.readFile("./db/db.json","utf8",(err,response)=>{
            if(err){
                throw err;
            } 
                console.log("RESPONSE" + response);
                let allNotes = JSON.parse(response);
                console.log("ALL NOTES " + allNotes);
                res.json(allNotes);
                

        });
    });


    // POST a new note
    app.post("/api/notes", function(req,res){
        console.log("*** Inside POST ***" +  req.body);

        fs.readFile("./db/db.json","utf8",(err,response)=>{
            if(err){
                throw err;
            } 
            let allNotes = JSON.parse(response);
            console.log("ALL NOTES " + allNotes);
            let latestID = 1 ;
            if (allNotes.length > 0) {
                latestID = allNotes[allNotes.length - 1].id;  
                latestID = latestID + 1;
              } else {
                latestID = "1";
              }
            const newNote = {
                ...req.body,id:latestID};
            allNotes = [...allNotes, newNote];
            console.log("combined list: ", allNotes);
            fs.writeFile("./db/db.json", JSON.stringify(allNotes), err =>{
                if(err) throw err;
                res.json({ success: true, msg: 'Created new note' });
                console.log("Note created!", newNote);
            });

        });
    });


    //DELETE a note
    app.delete("/api/notes/:id" , function(req,res){
    console.log("*** inside DELETE ***")
    var idToDelete = req.params.id;
    var filteredArray = [];
    fs.readFile("./db/db.json","utf8",(err,response)=>{
        if(err){
            throw err;
        } 
    });


     filteredArray = updatedArray.filter(function(updatedArray){
        return updatedArray != idToDelete;
    });
    console.log("Filtered Array--------" +  filteredArray);
    fs.writeFile("./db/db.json", JSON.stringify(filteredArray), err =>{
    if(err) throw err;
    res.json({ success: true, msg: 'Note deleted' });
    console.log("Note deleted!", idToDelete);
    })
    });
}


// for(var i = 0;i< updatedArray.length ; i++){
//     if(idToDelete === updatedArray[i].id)
//     updatedArray.splice(i,1);
// }
// console.log(updatedArray);
// fs.writeFile("./db/db.json", JSON.stringify(updatedArray,null,2), err =>{
//     if(err) throw err;
//     res.json(idToDelete);
// });