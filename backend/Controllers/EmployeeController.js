const createEmployee = async (req,res) =>{
    console.log(req.body)
    res.send('Got it')
}

export default createEmployee;