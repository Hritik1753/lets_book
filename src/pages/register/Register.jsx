import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import "./register.css"; // Assuming you have a CSS file for styling the registration form

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone:"",
    password: "",
  });

  const { loading, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" }); // Dispatch registration start action
    try {
      const res = await axios.post("/auth/register", credentials); // Assuming register API endpoint
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details }); // Dispatch registration success action
      navigate("/"); // Redirect to home page after successful registration
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data }); // Dispatch registration failure action
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          className="rInput"
        />

<input
          type="text"
          placeholder="Country"
          id="country"
          value={credentials.country}
          onChange={handleChange}
          className="rInput"
        />

<input
          type="text"
          placeholder="City"
          id="city"
          value={credentials.city}
          onChange={handleChange}
          className="rInput"
        />

<input
          type="text"
          placeholder="Phone"
          id="phone"
          value={credentials.phone}
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="rInput"
        />
        <button disabled={loading} onClick={handleClick} className="rButton">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;


// "username":"Hritik",
// "email": "hritik123456@gmail.com",
// "country":"india",
// "city":"barabanki",
// "phone": "7896541239",
// "password":"hritik"
