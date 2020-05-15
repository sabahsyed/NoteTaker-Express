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
                res.json(allNotes);
                

        });
    });


    // POST a new note
    app.post("/api/notes", function(req,res){
        console.log("*** Inside POST ***");

        fs.readFile("./db/db.json","utf8",(err,response)=>{
            if(err){
                throw err;
            } 
            let allNotes = JSON.parse(response);
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
                console.log("NOTE CREATED!", newNote);
            });

        });
    });


    //DELETE a note
    app.delete("/api/notes/:id" , function(req,res){
    fs.readFile("./db/db.json","utf8",(err,response)=>{
        if(err){
            throw err;
        } 
    console.log("*** INSIDE DELETE ***");
    var idToDelete = req.params.id;
    let allNotes = JSON.parse(response);
    let filteredArray = allNotes.filter(function(note){
        return note.id != idToDelete;
    });
    console.log("Filtered Array--------" +  response);
    fs.writeFile("./db/db.json", JSON.stringify(filteredArray), err =>{
        if(err) throw err;
        res.json(filteredArray);
        console.log("Note deleted!", idToDelete);
        });
    });
});


}


