import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateEmployee() {
  const { eid } = useParams();
  const [formData, setFormData] = useState({
    employee_name: '',
    dept_name: '',
    office_address: '',
    residence_address: '',
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/datasheet/${eid}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3002/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEmployeeData();
    fetchDepartments();
  }, [eid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3002/datasheet/${eid}`, formData);
      toast.success('Employee Data updated successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Update Employee</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="employee_name" className="form-label">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee_name"
                    name="employee_name"
                    value={formData.employee_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dept_name" className="form-label">
                    Department
                  </label>
                  <select
                    className="form-select"
                    id="dept_name"
                    name="dept_name"
                    value={formData.dept_name}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {departments.map((dept) => (
                      <option key={dept.dept_id} value={dept.dept_name}>
                        {dept.dept_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="office_address" className="form-label">
                    Office Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="office_address"
                    name="office_address"
                    value={formData.office_address || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="residence_address" className="form-label">
                    Residence Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="residence_address"
                    name="residence_address"
                    value={formData.residence_address || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateEmployee;
