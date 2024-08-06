const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const loginModel=require("./models/admin")


const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://bhagya:bhagya20@cluster0.gszky.mongodb.net/hospitaldb?retryWrites=true&w=majority&appName=Cluster0")

app.get("/test",(req,res)=>{
    res.json({"status":"success"})
})


app.post("/adminsignup",(req,res)=>{
   let input=req.body
   let hashedpassword=bcrypt.hashSync(input.password,10)
   //console.log(hashedpassword)
   input.password=hashedpassword
   console.log(input)
   let result=loginModel(input)
   result.save()
   res.json({"status":"success"})


})

app.post("/adminsignIn",(req,res)=>{
    let input=req.body
    let result=loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    res.json({"status":"success"})
                    
                } else {
                    res.json({"status":"incorrect password"})
                    
                }
                
            } else {
                res.json({"status":"username doesnot exit"})
                
            }
        }
    ).catch()
})

app.listen(5050,()=>{
    console.log("server started")
})

