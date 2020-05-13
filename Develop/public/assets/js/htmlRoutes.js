var path = require("path");

module.exports = function(app){
    app.get('/', function(req,res){
        console.log("app.get index.html");
        res.sendFile(path.join(__dirname + '../../../index.html'));
    });
    app.get('/notes', function(req, res) {
        console.log("Inside /notes");
        res.sendFile(path.join(__dirname + '../../../notes.html'));
    });
}