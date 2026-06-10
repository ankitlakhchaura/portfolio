const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
 port: 26458,
 ssl: {
  rejectUnauthorized: false
 }
});

db.connect(err => {
 if(err){
   console.log(err);
 } else {
   console.log("MySQL Connected");
 }
});

app.post("/contact",(req,res)=>{
 const {name,email,message}=req.body;

 db.query(
   "INSERT INTO contacts(name,email,message) VALUES(?,?,?)",
   [name,email,message],
   (err,result)=>{
      if(err){
         res.status(500).json(err);
      }else{
         res.json({message:"Message Sent"});
      }
   }
 );
});

app.listen(process.env.PORT,()=>{
 console.log("Server Running");
});