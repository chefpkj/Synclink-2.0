import express from "express"
import Users from "../../models/users.js";

const app=express();

app.get("/allUsers",async(req,res)=>{

    const allUsers=await Users.find({});


    return res.status(200).json({
        status:200,
        body:allUsers
    })
})

export default app;


