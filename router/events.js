import express from 'express'

const router = express.Router()

//Fetching all the events
router.get('/', (req, res)=>{
    res.send("Fetching all the events.")
})

//Fetching a certain event 
router.get('/:id',(req,res)=>{
    const event_id = req.params.id
    res.send(`Fetching event ${event_id}`)
})

//Inserting a new event
router.post('/add', (req,res)=>{
    res.send("Adding the event")
})

export default router
