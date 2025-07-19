import express from 'express'
const routes = express.Router() 

routes.get('/',(req,res)=>{
    res.send('Get all Employees ');
});



export default routes;