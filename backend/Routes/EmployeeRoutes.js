import express from 'express'
import createEmployee from '../Controllers/EmployeeController.js';
const routes = express.Router() 

routes.get('/',(req,res)=>{
    res.send('Get all Employees ');
});

routes.post('/',(createEmployee))

export default routes;