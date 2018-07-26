import mongoose, {Schema} from 'mongoose'

let User = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    passwordHash: String,
    type: String,
    events: [{e_id: String}]
})

export default mongoose.model('User', User)