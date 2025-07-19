import EmployeeDetails from './components/EmployeeDetails.jsx';
import EmployeeManagementApp from './components/EmployeeManagementApp.jsx';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="employee" />} />
            <Route path='/employee' element={<EmployeeManagementApp />} />
            <Route path='/employee/:id' element={<EmployeeDetails />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
