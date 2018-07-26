import express from 'express'

//Importing events model
import Events from '../models/events'
import User from '../models/user'

const router = express.Router()

//Fetching all the events
router.route('/').get((req, res)=>{
    Events.find((err, events)=>{
        if(err)
            res.status(401).send("Error fetching the events.")
        else
            res.status(200).send(events)
    })
})

//Fetching a certain event 
router.get('/:id',(req,res)=>{
    const event_id = req.params.id
    Events.findOne({event_id: event_id}, (err, event)=>{
        if(err)
            res.status(401).send("Error fetching the event.")
        else
            res.status(200).send(event)
    })
})

//Inserting a new event
router.post('/add', (req,res)=>{
    //Pass username as well
    let formData = req.body

    let new_event = new Events(formData)
    new_event.save((err, event)=>{
        if(err)
            res.status(401).send("Error adding new event")
        else {   
            //Updating the user's events field
            User.findOne({username: formData.hosted_by}, (err, user)=>{
                if(err)
                    console.log("Error: can't find user.")
                else{
                    user.events.push({e_id: formData.event_id})
                    user.save()
                    console.log("User Events array updated successfully!") 
                }
            })
            res.status(200).send("Event added successfully")
        }
    })
})

//For NGO to engage or set active id
router.post('/engage/:id', (req, res)=>{
    const event_id = req.params.id
    const username = req.body.username

    Events.findOne({event_id: event_id}, (err, event)=>{
        if(err)
            res.status(401).send(err)
        else{
            if(event.engaged_by !== undefined || event.engaged_by !== ""){
                event.engaged_by = username
                event.save()
                //Updating user events arrays
                User.findOne({username: username}, (err, user)=>{
                    user.events.push({e_id: event_id})
                    user.save()
                })
                res.status(200).send("Engagement updated successfully")
            }
            else    
                res.status(407).send("Event already engaged!")
        }
    })

})

//Update not available yet

//Delete not available yet

// router.post('/delete/:id',(req, res)=>{
//     const id = req.params.id
//     if(id === undefined)
//         res.status(401).send("No Id specified!")
    
//     Events.deleteOne({event_id: id}, (err, response)=>{
//         if(err)
//             console.log(err)
//         else    
//             res.status(200).send("Successfully Deleted!")
//     })
// })

export default router
