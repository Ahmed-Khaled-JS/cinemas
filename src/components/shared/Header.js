import React from 'react';
import { Link } from 'react-router-dom';
const Header = ({logout , userRole}) => {
    return (
        <nav className="navbar navbar-expand-lg postionFixedNav">
            <div className="container-fluid">
                <Link className="navbar-brand headerNav" to="/">Cinema</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active navlink" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item lier" id="cancel">
                            <Link className="nav-link active navlink" aria-current="page" to="/Checkreservation">Yourreservation</Link>
                        </li>
                        {userRole === "admin" && (<li className="nav-item lier" id="cancel">
                            <Link className="nav-link active navlink" aria-current="page" to="/Admin">admin</Link>
                        </li>)}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="nav-link active navlink" aria-current="page" onClick={logout} >Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
