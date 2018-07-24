import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const PORT = 3000 || process.env.PORT

const app = express()

app.get('/',()=>res.send("Application running."))

app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`)
})