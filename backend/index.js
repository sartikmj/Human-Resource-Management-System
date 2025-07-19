import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'; //body-parser is a middleware in Express used to parse the incoming request body before your route handlers access it.
// By default, Express doesn't understand the body of POST, PUT, or PATCH requests. body-parser helps extract data sent by the client.

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080;

import './Models/db.js' //MongoDB connection file

import EmployeeRouter from './Routes/EmployeeRoutes.js'

//body-parser middleware
// Parses JSON data from request body
app.use(bodyParser.json()) 
// Parses URL-encoded data (like form submissions)
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',(req,res)=>{
    res.send("Server is Running")
})

//delegates routing logic to another file EmployeeRoutes.js
app.use('/api/employees', EmployeeRouter) //For any request that starts with /api/employees, forward it to the EmployeeRouter/

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})