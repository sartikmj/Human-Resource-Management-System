import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable.jsx'
import { DeleteEmployeeById, GetAllEmployees } from '../api.js';
import AddEmployee from './AddEmployee.jsx';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils.js';

const EmployeeManagementApp = () => {

  const [showModal, setShowModal] = useState(false);
  const [updateEmpObj, setUpdateEmpObj] = useState(null);

  const [employeeData, setEmployeeData] = useState({
    "employees": [],
    "pagination": {
      "totalEmployees":0,
      "currentPage": 1,
      "totalPages": 1,
      "pageSize": 5
    }
  });

  const fetchEmployees= async (search='',page=1, limit=5)=>{
    try{
      const { data } = await GetAllEmployees(search,page,limit);
      setEmployeeData(data)
      
    }
    catch(err){
      console.log('Error', err)
    }
  }

  useEffect(()=>{
    fetchEmployees()
  },[])

  const handleAddEmployee = ()=>{
    setShowModal(true)
  }

  const handleUpdateEmployee = (empObj) => {
    console.log('Update Object', empObj)
    setUpdateEmpObj(empObj);
    setShowModal(true);
  }

  const handleDeleteEmployee = async (emp) => {
    fetchEmployees()
    try{
      const { success, message } = await DeleteEmployeeById(emp._id);
      if(success){
        notify(message, 'success')
      }else{
        notify(message, 'error')
      }
    }
    catch(err){
      console.log('Error', err)
      notify(err, 'Error')
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    fetchEmployees(term)
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
      <h1>Employee Management App</h1>
      <div className='w-100 d-flex justify-content-center'>
        <div className='w-80 border bg-light p-3' style={{width: '80%'}}>
          <div className='d-flex justify-content-between mb-3'>
            <button className='btn btn-primary'
              onClick={()=> handleAddEmployee()}
            >
              Add
            </button>

            <input 
            onChange={handleSearch}
            type="text" placeholder='Search Employees...' 
            className='form-control w-50' />
          </div>

        <EmployeeTable 
        handleUpdateEmployee={handleUpdateEmployee}
          fetchEmployees = {fetchEmployees}
          employees = {employeeData.employees}
          pagination = {employeeData.pagination}
          handleDeleteEmployee={handleDeleteEmployee}
        />

        <AddEmployee 
          updateEmpObj={updateEmpObj}
          fetchEmployees={fetchEmployees}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  )
}

export default EmployeeManagementApp