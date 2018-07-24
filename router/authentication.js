import express from 'express'
import mongoose, {connection} from 'mongoose'

//Importing models
import UserModel from '../models/user'  

const router = express.Router()

mongoose.connect("mongodb://localhost:27017/alask-db")

connection.once('open',()=>{
    console.log("Connection Established!");
})

//Handling login route
router.post('/login', (req, res)=>{
    console.log(req.params)
})

export default router