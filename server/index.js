const express = require("express")
require('dotenv').config()
const {connection} = require("./db")
const {userRoutes} = require("./routes/userRoutes")
const app = express()
const cors = require('cors');
const { oemRouter } = require("./routes/oemRoutes")
const { InventoryRouter } = require("./routes/inventoryRoutes")
app.use("/",userRoutes)
app.use("/",oemRouter)
app.use("/",InventoryRouter)
app.use(express.json())
app.use(cors());


const port = process.env.port

app.listen( port , async (req,res)=>{
    try{
        await connection
        console.log("Mongo Server Runs");
    }catch(err){
        console.log(err);
        console.log("Some Error OccouredS IN Mongo");
    }
    console.log(`Server Is Running On Port No ${port}`)
})