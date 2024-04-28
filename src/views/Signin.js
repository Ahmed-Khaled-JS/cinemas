import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faFilm } from "@fortawesome/free-solid-svg-icons";
import axios from "../../node_modules/axios/lib/axios";
import baseurl from "../apis";
import { Navigate,Link } from "react-router-dom";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [token,settoken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic here
    if (!validateEmail(email)) {
      setEmailError(true);
    }
    if (!validatePassword(password)) {
      setPasswordError(true);
    }
    if (validateEmail(email) && validatePassword(password)) {
      const response = await axios.post(`${baseurl}/signin`, {
        email: email,
        password: password,
      });
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token);
      settoken(sessionStorage.getItem("token"));
    }
  };

  const validateEmail = (email) => {
    // Basic email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Password validation logic
    const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  };
  if(sessionStorage.getItem('token')){
    return <Navigate to="/" />
  }
  return (
    <div className="main">
      <div
        className="alert alert-success messageBack text-center displayerror"
        id="messageBack"
        role="alert"
      ></div>
      <h1 className="text-center text-white paddingsignin">
        Our Cinema
        <span className="icon">
          {" "}
          <FontAwesomeIcon icon={faFilm} />
        </span>
      </h1>
      <div className="mainborderflex">
        <div className="mainborder rounded-3">
          <h4 className="text-center pt-2">Sign in with your account</h4>
          <br />
          <div className="forminputs">
            <form onSubmit={handleSubmit}>
              <div className="designinputwithlabel">
                <label htmlFor="input1">Your email</label>
                <input
                  id="input1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control widthinput"
                  placeholder="enter your email"
                />
                {emailError && (
                  <p className="validInput" id="emailerror">
                    email is invalid
                  </p>
                )}
              </div>
              <br />
              <div className="designinputwithlabel">
                <label htmlFor="input2">Your password</label>
                <input
                  id="input2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control widthinput"
                  placeholder="enter your password"
                />
                {passwordError && (
                  <p className="validInput" id="passworderror">
                    <FontAwesomeIcon icon={faCircleXmark} /> At least 8
                    characters long
                    <br />
                    <FontAwesomeIcon icon={faCircleXmark} /> Contain at least
                    one uppercase letter
                    <br />
                    <FontAwesomeIcon icon={faCircleXmark} /> Contain at least
                    one digit
                  </p>
                )}
              </div>
              <br />
              <br />
              <div className="divbutton">
                <p className="text-center pt-4">
                  <button
                    id="buttonsign"
                    className="btn btn-danger buttonsign"
                    type="submit"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="text-center text-white NewAccount">New to Our Cinema?</p>
      <p className="text-center">
        <Link
          to="/signup"
          className="btn btn-light buttoncreate bg-danger text-white"
          id="gotosignup"
        >
          Create your account
        </Link>
      </p>
    </div>
  );
};

export default Signin;
