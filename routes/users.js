const express = require("express")
const router = express.Router()

router.get("/",(req, res)=> {
    res.send("User List")
})
router.get("/new", (req,res)=>{
    res.send("User New Form")
})

//create user 
router.post("/", (req, res)=>{
    res.send("Create User")
})

//access user 
router
    .route("/:id")
    .get((req,res)=>{
        res.send( `Get user with ID: ${req.params.id}`)
    })
    .put((req,res)=>{
        res.send( `Update user with ID: ${req.params.id}`)
    })
    .delete((req,res)=>{
        res.send( `Delete user with ID: ${req.params.id}`)
    })



module.exports = router