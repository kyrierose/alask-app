import mongoose, {Schema} from 'mongoose'

let events = new Schema({
    event_id: String,
    name: String,
    location: String,
    description: String, 
    contact_number: Number,
    event_status: String, //Upcoming, Expired, Ongoing 
    engaged_by: String, //either ngo(id) or helper(id)
    hosted_by: String
})

export default mongoose.model('events', events)