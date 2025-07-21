import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetEmployeeDetailsById } from "../api";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  console.log(id);

  const fetchEmployeeDetails = async () => {
    try {
      const data = await GetEmployeeDetailsById(id);
      setEmployee(data);
    } catch (err) {
      alert("Error", err);
    }
  };
  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="container mt-5 ">
      <div className="card">
        <div className="card-header">
          <h2>Employee Details</h2>
        </div>

        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <img
                src={employee.profileImage}
                alt={employee.name}
                className="img-thumbnail rounded"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>

            <div className="col-md-9">
              <h4>{employee.name}</h4>
              <p>
                <strong>Email:</strong> {employee.email}
              </p>
              <p>
                <strong>Phone:</strong> {employee.phone}
              </p>
              <p>
                <strong>Department:</strong> {employee.department}
              </p>
              <p>
                <strong>Salary:</strong> {employee.salary}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/employee")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
