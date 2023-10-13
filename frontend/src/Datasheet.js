import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function Datasheet() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/datasheet');
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (eid) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this employee data?');
      if (!confirmed) {
        return;
      }

      await axios.delete(`http://localhost:3002/datasheet/${eid}`);
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Employee Datasheet</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Office Address</th>
            <th>Residence Address</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.eid}>
              <td>{employee.eid}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.dept_name}</td>
              <td>{employee.office_address || 'N/A'}</td>
              <td>{employee.residence_address || 'N/A'}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(employee.eid)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={`/update-employee/${employee.eid}`} className="btn btn-success">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}

export default Datasheet;
