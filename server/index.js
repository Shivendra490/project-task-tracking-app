const express=require("express")

const app=express()

const authRoutes=require("./routes/auth")

// app.use("/",(req,res,next)=>{
//     res.send("hello")
// })

app.use("/api/auth",authRoutes)

app.listen(8080)