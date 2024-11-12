const express = require("express")
const app = express()

app.use(express.static("public"))

const userRouter = require("./routes/users")
app.use("/users", userRouter)

const patternRouter = require("./routes/patterns")
app.use("/patterns", patternRouter)

app.listen(3000,()=>{
    console.log("Server is running")
})
