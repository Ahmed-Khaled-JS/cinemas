import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faCircle } from '@fortawesome/free-solid-svg-icons';
import "../components/Css/regsister.css";
import axios from '../../node_modules/axios/lib/axios';
import baseurl from '../apis';
import { Link,Navigate } from 'react-router-dom';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [messageverfiy,setmessageverfiy] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation logic here
        if (!validateEmail(email)) {
            setEmailError(true);
        }else
        setPasswordError(false);
        if (!validatePassword(password)) {
            setPasswordError(true);
        }else{
            setPasswordError(false);
        }
        if(validateEmail(email) && validatePassword(password)){
            const response = await axios.post(`${baseurl}/signup`,{
                "email":email,
                "password":password
            }) 
            setmessageverfiy(response.data.message);
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
            {messageverfiy && (<div className="alert alert-success messageBack text-center" id="messageBack" role="alert">
                {messageverfiy} let's login from <Link to="/signin">here</Link>
            </div>)}
            <h1 className="text-center text-white paddingsignin">SA Cinema<span className="icon"> <FontAwesomeIcon icon={faFilm} /></span></h1>
            <div className="mainborderflex">
                <div className="mainborder rounded-3">
                    <h4 className="text-center pt-2">Signup for new account</h4>
                    <br />
                    <div className="forminputs">
                        <form onSubmit={handleSubmit}>
                            <div className="designinputwithlabel">
                                <label htmlFor="input1">Your email</label>
                                <input id="input1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control widthinput" placeholder="enter your email" />
                                {emailError && <p className="validInput" id="emailerror">email is invalid</p>}
                            </div>
                            <br />
                            <div className="designinputwithlabel">
                                <label htmlFor="input2">Your password</label>
                                <input id="input2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control widthinput" placeholder="enter your password" />
                                {passwordError && <p className="validInput" id="passworderror">
                                    <FontAwesomeIcon icon={faCircle} /> At least 8 characters long<br />
                                    <FontAwesomeIcon icon={faCircle} /> Contain at least one uppercase letter<br />
                                    <FontAwesomeIcon icon={faCircle} /> Contain at least one digit</p>}
                            </div>
                            <br />
                            <br />
                            <div className="divbutton">
                                <p className="text-center pt-4"><button id="buttonsign" className="btn btn-danger buttonsign" type="submit">Sign up</button></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
