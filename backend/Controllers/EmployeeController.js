import EmployeeModel from '../Models/EmployeeModel.js'

const createEmployee = async (req,res) =>{
    try{
        const body = req.body;
        body.profileImage = req.file ? req.file.path: null;
        console.log(body)
        const emp = new EmployeeModel(body); //makes a new document in db and saves the form data in it.
        await emp.save();
        res.status(201)
            .json({
                message: 'Employee created',
                sucess: true
            })
    }
    catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}


const updateEmployeeById = async (req,res) =>{
    try{
        const {name, phone, email, salary, department, } = req.body;
        const {id} = req.params;
    
        let updateData = {
            name, phone, email, salary, department, updatedAt: new Date() //time at which it is updated, will be updated
        }

        if(req.file){ //if file comes in req that means the user also updated profile pic so we have to update it too from cloudinary
            updateData.profileImage = req.file.path;
        }
        //now we have to put this updated data into database
        const updateEmployee = await EmployeeModel.findByIdAndUpdate(
            id,  // The MongoDB `_id` of the employee to update
            updateData, // An object containing the fields you want to update
            { new:true } // Option to return the updated document (not the old one)
        )
        if(!updateEmployee){ //Data is ot available in the db
            return res.status(404).json({message: 'Employee not found'})
        }

        res.status(200)
            .json({
                message: 'Employee Updated',
                sucess: true,
                data: updateEmployee
            });
    }
    catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const getAllEmployees = async (req,res) =>{
    try{
        const emps = await EmployeeModel.find({}); //to get all documents inside our collection in db
        
        res.status(200)
            .json({
                message: 'All Employees',
                sucess: true,
                data: emps
            })
    }
    catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const getEmployeeById = async (req,res) =>{
    try{
        const {id} = req.params;
        const emp = await EmployeeModel.findOne({_id: id}); //to get all documents inside our collection in db
        
        res.status(200)
            .json({
                message: 'Get Employee Details',
                sucess: true,
                data: emp
            })
    }
    catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const deleteEmployeeById = async (req,res) =>{
    try{
        const {id} = req.params;
        const emp = await EmployeeModel.findByIdAndDelete({_id: id}); //to get all documents inside our collection in db
        
        res.status(200)
            .json({
                message: 'Employee Deleted',
                sucess: true
            })
    }
    catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}


export { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById };
