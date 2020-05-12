var express = require("express");
var app =  express();
var fs = require("fs");
var path = require("path");
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get('*', function(req,res){
  console.log("app.get index.html");
  res.sendFile(path.join(__dirname + '../../../index.html'));
});
// app.get('/notes', function(req, res) {
//   console.log("Inside /notes");
//   res.sendFile(path.join(__dirname + '../../../notes.html'));
// });
app.listen(PORT, function(){
  console.log("App listening on PORT:" + PORT);
  console.log("HELOO");
})