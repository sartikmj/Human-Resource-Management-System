import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    department:{
        type:String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    createdAt: {
        type:Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

const EmployeeModel = mongoose.model('employees', EmployeeSchema) // 'employees' is the name of collectionn
//mongoose will connect collection employees with schema EmployeeSchema

export default EmployeeModel;