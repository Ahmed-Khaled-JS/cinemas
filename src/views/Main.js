import { Navigate } from "react-router-dom";
import "../components/Css/main.css";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import axios  from '../../node_modules/axios/dist/esm/axios';
import baseurl from '../apis';
import CatagorySection from "../components/CatagorySection";

const Main = () => {
    const [userRole, setUserRole] = useState("");
    const [catagories,setCatagories] = useState([]);
    useEffect(() => {
        const tokendetails = async () => {
            const token = sessionStorage.getItem('token'); // Assuming the token is stored in local storage
            if (token && token !== "undefined") {
                const decoded = jwtDecode(token);
                setUserRole(decoded.role);
            }
            try {
                const response = await axios.get(`${baseurl}/category`, {
                    headers: {
                      Authorization: sessionStorage.getItem("token"),
                    },
                  });
                setCatagories(response.data.result);
            } catch (error) {
                console.log("eh ya she5a");
            }
            

        }

        tokendetails();
    }, []);

    const logout = () => {
        sessionStorage.removeItem('token');
        setUserRole("");
    }

    if (!sessionStorage.getItem('token') || sessionStorage.getItem('token') === "undefined") {
        sessionStorage.removeItem('token');
        return <Navigate to="/signIn" />;
    }

    return (
        <>
            <Header logout={logout} userRole={userRole} />
            <MainLayout />
            <CatagorySection catagories={catagories}/>
            <Footer />
        </>
    );
}

export default Main;
