const express  = require("express")
const {connection} = require("./db")
const app = express();
app.use(express.json());

app.listen( 8080 , async ()=>{
    try{
        await connection
        console.log("Mongo Server Runs");
    }catch(err){
        console.log(err);
        console.log("Some Error OccouredS IN Mongo");
    }
    console.log(`Server Is Running On Port No 8080`)
})