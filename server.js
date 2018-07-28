import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

//Route imports
import auth from './router/authentication'
import events from './router/events'

const PORT = process.env.PORT || 3000

const app = express()

//Middlewares used
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/alask-app'));

app.use('/auth', auth)
app.use('/events',events)

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/alask-app/index.html'));
});

//Handling Error 404
app.get('**', (req, res)=>res.send("Error 404: You seems to have lost."))

app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`)
})