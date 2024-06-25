const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

const app=express()
const port=process.env.PORT || 8080
const cors=require("cors")
const bodyParser=require("body-parser")

const authRoutes=require("./routes/auth")

// app.use("/",(req,res,next)=>{
//     res.send("hello")
// })
app.use(cors({
    origin:"*"
}))

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/api/auth",authRoutes)



mongoose.connect(process.env.DB_URL).then(()=>{
    app.listen(port,()=>{
        console.log('Server is running at',port)
    })
}).catch((err)=>console.log("DB_ERR"))
