import express from 'express'
import dotenv from 'dotenv'

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080;

import './Models/db.js' //MongoDB connection file

import EmployeeRouter from './Routes/EmployeeRoutes.js'

app.get('/',(req,res)=>{
    res.send("Server is Running")
})

//delegates routing logic to another file EmployeeRoutes.js
app.use('/api/employees', EmployeeRouter) //For any request that starts with /api/employees, forward it to the EmployeeRouter/

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})