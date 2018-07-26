import express from 'express'
import mongoose, {connection} from 'mongoose'
import jwt from 'jsonwebtoken'

//Importing models
import UserModel from '../models/user'  

const router = express.Router()

mongoose.connect("mongodb://localhost:27017/alask-db")

connection.once('open',()=>{
    console.log("Connection Established!");
})

//handling registration route
router.post('/register', (req, res)=>{
    let formData = req.body
    //Storing password hash instead of password
    formData.passwordHash = jwt.sign(formData.password, "Password")

    let user = new UserModel(formData)
    user.save((err, registeredUser)=>{
        if(err)
            console.log(err)
        else{
            //generating token
            let payload = { subject: registeredUser._id }
            const token = jwt.sign(payload, "AkshitDhar")
            let response = JSON.parse(JSON.stringify({token:token, type:registeredUser.type}))
            res.status(200).send(response)
        }
    })

})

//Handling login route
router.post('/login', (req, res)=>{
    //Check if user exists 
    UserModel.findOne({username: req.body.username}, (err, user)=>{
        if(err){
            res.send(JSON.stringify({msg: err}))
        }
        else{
            if(!user)
                res.status(401).send("No user found!")
            else if(jwt.sign(req.body.password, "Password") !== user.passwordHash){
                res.status(401).send("Password doesn't match")
            }
            else{
                //Generate Token
                let payload = { subject: user._id }
                const token = jwt.sign(payload, "AkshitDhar")
                //Generating the response object
                let response = JSON.parse(JSON.stringify({token:token, type:user.type}))
                res.status(200).send(response)
            }
        }
    })
})

export default router