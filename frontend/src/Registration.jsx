import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "./background.jpg";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useSelector, useDispatch } from "react-redux";
import { register } from "./features/address";

const Registration = () => {
  const [values, setValues] = useState({
    name: "",
    department: "",
    address_office: "",
    address_residence: "", 
  });

  const address_temp = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [temp,settemp]=useState(values)
  useEffect((event) => {
    fetchDepartmentOptions();
    settemp(values);
  
  }, [values]);


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!recaptchaValue) {
      toast.error("Please complete the ReCAPTCHA");
      return;
    }

    const { name, department, address_office } = values; 

   
    const address_residence = address_temp.value.address;

    axios
      .post("http://localhost:3002/register", {
        name,
        department,
        address_office,
        address_residence,
      })
      .then((res) => {
        console.log("Data sent successfully");
        toast.success("Form submitted successfully");

        const address = address_residence || address_temp.value.address;
        dispatch(register(address));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Form submission failed");
      });
  };

  const fetchDepartmentOptions = () => {
    axios
      .get("http://localhost:3002/departments")
      .then((response) => {
        setDepartmentOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching department options:", error);
      });
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  const onChange = (value) => {
    setRecaptchaValue(value);
    console.log(value);
  };

  return (
    <div style={backgroundStyle}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            AHAsolar Technologies Ltd.
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/datasheet" className="nav-link">
                  Data Sheet
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/update-employee/:eid" className="nav-link">
                  Update Employee
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h3 className="text-center">Employee Form</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name">
                      <strong>Name</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="department">
                      <strong>Department Name:</strong>
                    </label>
                    <select
                      name="department"
                      className="form-select"
                      onChange={handleChange}
                      required
                    >
                      <option value={""}>--Select Department--</option>
                      {departmentOptions.map((option) => (
                        <option key={option.dept_id} value={option.dept_id}>
                          {option.dept_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address_office">
                      <strong>Address (Office)</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter office address"
                      name="address_office"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address_residence">
                      <strong>Address (Residence)</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter residence address"
                      name="address_residence"
                      className="form-control"
                      onChange={handleChange}
                      value={address_temp.value.address}
                      disabled
                    />
                    <Link to={`/setaddress`} className="btn btn-success">
                      Get Address
                    </Link>
                  </div>

                  <ReCAPTCHA
                    sitekey="6Ldt95UoAAAAAFQY9O5Ig_kT4EViYVQnOJV_gfHT"
                    onChange={onChange}
                    required
                  />
                  <br />

                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center p-2">
        <p>&copy; {new Date().getFullYear()} Your App Name</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Registration;
