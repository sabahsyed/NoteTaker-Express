var express = require("express");
var app =  express();
var fs = require("fs");
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended : true}));
app.use(express.json());

require("./htmlRoutes")(app);
require("./apiRoutes")(app);

app.listen(PORT, function(){
  console.log("App listening on PORT:" + PORT);
  console.log("I am index.js");
})