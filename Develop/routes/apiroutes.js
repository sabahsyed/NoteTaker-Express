const fs  = require("fs");

module.exports = function(app){
    app.get("/api/notes", function(req,res){
        console.log("Inside API");
        fs.readFile("./db/db.json","utf8",(err,response)=>{
            if(err){
                throw err;
            } 
                console.log("RESPONSE" + response);
                let allNotes = JSON.parse(response);
                console.log("ALL NOTES " + allNotes)
                res.json(allNotes);

        });
    });

    app.post("/api/notes", function(req,res){
        console.log("Inside POST API" +  req.body);

        fs.readFile("./db/db.json","utf8",(err,response)=>{
            if(err){
                throw err;
            } 
            let allNotes = JSON.parse(response);
            let latestID ;
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
            })

        });
    });
}