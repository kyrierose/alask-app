import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const PORT = 3000 || process.env.PORT

const app = express()

app.use(bodyParser.apply.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',()=>res.send("Application running."))

app.get('**', ()=>res.send("Error 404: You seems to have lost."))

app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`)
})