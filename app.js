//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts = [];
const app = express();
let urlVar, titleVar;

app.set('view engine', 'ejs');


app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("home",{paratype:homeStartingContent, post:posts , _:_});
});

app.get("/about", function(req,res){
  res.render("about",{aboutVar:aboutContent});
});
app.get("/contact", function(req,res){
  res.render("contact",{contactVar:contactContent});
});
app.get("/compose", function(req,res){
  res.render("compose");
});
app.get("/posts/:urlPath", function(req,res){
  urlVar = _.kebabCase(req.params.urlPath);

  posts.forEach(function(element){
    var pTitle = element.pTitle;
    var pData = element.pData;
    var reqTitle = _.kebabCase(element.pTitle);
    if (urlVar === reqTitle ){
      res.render("post",{postTitle:pTitle,postData: pData});
    }
  });
});

app.post("/compose",function(req,res){

  const composedData = {
    pTitle : req.body.postTitle,
    pData : req.body.postData
  }
  posts.push(composedData);

  res.redirect("/");
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
