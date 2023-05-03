import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: String,
    role: {
        type: String,
        enum: ['user', 'author'],
        default: 'user'
    }
});

export default model("User", userSchema);