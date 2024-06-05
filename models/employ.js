import { model, Schema } from "mongoose";


const empolySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    phone_number: {
        type: Number,
        unique:true
    },
    designation: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    date: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isStatus: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
    }
   
    
}, { timestamps: true })

const Employee = model("Employee",empolySchema)

export default Employee;