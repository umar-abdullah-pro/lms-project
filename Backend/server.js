// Core Modules
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")

// //Local Modules
// const userRouter = require("./Routes/userRouter")
const authRouter = require("./Routes/authRouter")
const courseRouter = require("./Routes/courseRouter")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB_PATH).then(()=>{
    console.log("✅ Connected to MongoDB successfully!")
}).catch((err)=>{
    console.log("❌ MongoDB connection error:", err)
})

app.use('/api/auth', authRouter)
app.use('/api/courses', courseRouter)

app.get('/', (req, res)=>{
    res.send("LMS API is Running")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
})