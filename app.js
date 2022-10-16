

// jshint esversion:6

const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs")
// js lodash library
const _ =require("lodash");
// path to access public folder
const path=require("path");
// mongodb for blodb
const mongoose=require("mongoose");





const app=express();
app.use(bodyparser.urlencoded({extended:true}));
// here we tell express to use static files
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("public"));


// to tell our app to us eejs
app.set('view engine', 'ejs');

// html content for each page
const homecontent="If solution number One does not work for you then you may simply follow this one. Here, at first you need to check whether the port you are using for your program is open or not. Sometimes, when the port number is mismatched or the port you have definedhas already opened in another application, you will face this error."

const contctcontent="Lorem ipsum dolor sit amet, consectetur adipiscingelit.Duis ac condimentum sem. Integer feugiat libero eu nisl hendrerit dictum. Duis sed convallis est, id malesuada lectus. Suspendisse vitae urna semper,honcus urna eget, sollicitudin massa. Nunc gravida purus eu congue placerat.Fusce feugiat, massa et malesuada"

let aboutcontent="Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";





// database
mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true});
// post shema
const postschema={title:String,postcontent:String}
const Postmodel=mongoose.model("post",postschema);








// home render page
app.get("/",function(req,res){
  // Setting the response
  // to dipplay in html format
  res.set("Content-Type","text/html");

  Postmodel.find({},(err,posts)=>{
    res.render("home",{
      homecont:homecontent,
      contettopost:posts
    });
    console.log(posts);
  });
});




// Contact render page
app.get("/contact",function(req,res){
  // Setting the response
  // to dipplay in html format
  res.set("Content-Type","text/html");

  res.render("contact",{contactcont:contctcontent});
});


//about render page
app.get("/about",function(req,res){
  // Setting the response
  // to dipplay in html format
  res.set("Content-Type","text/html");

  res.render("about",{aboutcont:aboutcontent});
});




// compose new post
app.get("/compose",(req,res)=>{
  res.render("compose"
  );
});




app.post("/compose",(req,res)=>{

  const post=new Postmodel({
    title:req.body.posttitle,
    postcontent:req.body.postbody
  });
  post.save();


  res.redirect("/");
});



app.get('/posts/:_id',function(req,res){
  let ob=req.params._id;
  // let  lowercase1= _.lowerCase(ob)

  Postmodel.find({_id:ob},(err,posts)=>{
    if(!err){
      posts.forEach((i)=>{
        // let titlepost=i._id

        // let  lowercase2= _.lowerCase(titlepost)
        // if(lowercase1 === lowercase2){
          res.render("post",{ contettopost:posts});
           // res.redirect('/post');
        // }else{
        //    console.log("notmatch");
        // }
      });
    }else{
      console.log(err);
    }

  });

  // posts.forEach((i) => {
  // let titlepost=i._id
  //  // let str2 = _.camelCase(titlepost);
  //  let  lowercase2= _.lowerCase(titlepost)
  // if(lowercase1 === lowercase2){
  //  res.render("post",{contettopost:posts});
  //   // res.redirect('/post');
  // }else{
  //   console.log("notmatch");
  // }
});

// });






app.listen(3000,()=>{
  console.log("hey server is running on port 3000");
})
