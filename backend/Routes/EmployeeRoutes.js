import express from 'express'
import {createEmployee, deleteEmployeeById, getAllEmployees, getEmployeeById, updateEmployeeById} from '../Controllers/EmployeeController.js';
import cloudinaryFileUploader from '../Middlewares/FileUploader.js';
const routes = express.Router() 


// POST /api/employees - with image upload
routes.get('/', getAllEmployees)


routes.post('/', cloudinaryFileUploader.single('profileImag e'), createEmployee) //store the image to cloudinary and return file path(of) that we will store in our db

routes.put('/:id', cloudinaryFileUploader.single('profileImag e'), updateEmployeeById) //store the image to cloudinary and return file path(of) that we will store in our db

routes.get('/:id', getEmployeeById)

routes.delete('/:id', deleteEmployeeById)

export default routes;