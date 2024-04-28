import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { useEffect, useState } from "react";
import baseurl from "../apis";
import { jwtDecode } from "jwt-decode"; // Correct import
import axios from "../../node_modules/axios/dist/esm/axios";

const Checkreservation = () => {
  const [reservation, setreservation] = useState([]);
  const token = sessionStorage.getItem("token"); // Assuming the token is stored in local storage
  const decoded = jwtDecode(token);
  console.log(decoded);
  useEffect(() => {
    const tokendetails = async () => {
      const response = await axios.get(
        `${baseurl}/bookTicket/reservation`
        ,{
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
      setreservation(response.data.result);
      console.log(response.data.result);
    };
    tokendetails();
  }, []);
  const Cancelreservation = (e) => async () => {
    console.log(e)
    const respons2e = await axios.delete(`${baseurl}/bookTicket`,{
        data: { id:e }

    });
    console.log(respons2e);
    const response = await axios.get(
      `${baseurl}/bookTicket/reservation`
      ,{
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
    setreservation(response.data.result);
  };
  return (
    <>
      <Header />
      <h3 class="text-center fontcenterhead">Your Reservation</h3>
      <div class="container">
        {reservation.map((res) => {
          return (
            <>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{res.movieName}</h4>
                  <p className="card-text">
                    Number of Tickets: {res.seats.length}
                  </p>
                  <a
                    className="btn btn-danger"
                    onClick={Cancelreservation(res._id)}
                  >
                    Cancel your reservation
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <Footer />
    </>
  );
};
export default Checkreservation;
