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
         //implementing search functonality and pagination
        let {page, limit, search} = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page-1)*limit; //Calculates how many documents to skip based on the current page and limit.
        //page= 1 => (1-1)*5 = 0 skip
        //page= 2 => (2-1)*5 = 5 skip

        let searchCriteria = {};
        if(search){
            searchCriteria = {
                name: { 
                    //Regex (short for Regular Expression) is a powerful pattern-matching tool used to search, match, and manipulate text based on specific patterns.
                    $regex: search,
                    $options: 'i' //case in-sensitive
                }
            }
        }

        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria) //to show how many documents are there who match the search criteria

        const emps = await EmployeeModel.find(searchCriteria) //to get all searchCriteria satisfying documents inside our collection in db
            .skip(skip)
            .limit(limit)
            .sort({updatedAt: -1})

        const totalPages = Math.ceil(totalEmployees/limit);
        res.status(200)
            .json({
                message: 'All Employees',
                sucess: true,
                data: {
                    employees: emps, 
                    pagination: {
                        totalEmployees,
                        currentPage: page,
                        totalPages,
                        pageSize: limit
                    }
                }
            })
    }
    catch(err){
        console.log(err);
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
