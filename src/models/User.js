import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    email: String
})

export default model('User', UserSchema)