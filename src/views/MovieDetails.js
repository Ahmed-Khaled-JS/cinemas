import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/dist/esm/axios";
import baseurl from "../apis";
import Header from "../components/shared/Header";
import "../components/Css/specficmovie.css";
import Footer from "../components/shared/Footer";
import { jwtDecode } from "jwt-decode"; // Correct import
import { Navigate } from "react-router-dom";

const MovieDetails = () => {
  const [movie, setmovie] = useState({});
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    cardDate: "",
    cardCvv: "",
    userId: jwtDecode(sessionStorage.getItem("token")).userId,
  });
  const [counter, setrender] = useState(0);
  const [flag, setflag] = useState(false);
  const [chairs, setcharies] = useState(Array(25).fill(0));
  const id = useParams();
  const getdata = async () => {
    console.log(id);
    const response = await axios.get(`${baseurl}/movie/${id.id}`, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    setmovie(response.data.result);
    console.log(movie);
    response.data.result.avaliableSeat.forEach((element) => {
      chairs[element - 1] = 1;
    });
    console.log(chairs);
    console.log(response.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  const handleticketchair = (data) => () => {
    let arr = chairs;
    arr[data] = 2;
    setcharies(arr);
    setrender(counter + 1);
    console.log(chairs);
  };
  const cancelhandleticketchair = (data) => () => {
    let arr = chairs;
    arr[data] = 1;
    setcharies(arr);
    setrender(counter - 1);
    console.log(chairs);
  };
  const bookatickets = async () => {
    let listofsetcharies = [];
    for (let index = 0; index < 25; index++) {
      if (chairs[index] === 2) listofsetcharies.push(index + 1);
    }
    const token = sessionStorage.getItem("token"); // Assuming the token is stored in local storage
    const decoded = jwtDecode(token);
    const response = await axios.post(
      "http://localhost:3000/bookTicket",
      {
        movieName: movie.movieName,
        seats: listofsetcharies,
        userId: decoded.userId,
      },
      {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );
    if (response.data.message === "please enter your visa") setflag(true);
    else {
      navigate("/Checkreservation");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can do something with the form data, like sending it to the server
    console.log("Form submitted:", formData);
    const response = await axios.post("http://localhost:3000/pay", formData);
    setflag(false);
    console.log(response);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const logout = () => {
    sessionStorage.removeItem("token");
    setUserRole("");
  };

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/signIn" />;
  }
  return (
    <>
      <Header logout={logout} userRole={userRole} />
      <div className="heightlength">
        <p className="text-center  textCategory">Booking a ticket for movie</p>
        <div className="container">
          <div className="row" id="specficMovie">
            <div className="col-md-6" id="first">
              {movie && (
                <img
                  className="imagemovie border border-danger border-4  rounded-4"
                  src={`${movie.movieImage}`}
                  alt="image"
                />
              )}
            </div>

            <div className="col-md-6 postion1" id="second">
              {movie && (
                <>
                  <p className="text-white font1"><span className="boldfont">Title :</span> {movie.movieName}</p>

                  <br />

                  <p className="text-white font1">
                    <span className="boldfont">Category : {" "}</span> 
                    {movie.categoryOfMovie && (
                      <>{movie.categoryOfMovie.categoryName}</>
                    )}
                  </p>

                  <br />

                  <p className="text-white font1">
                  <span className="boldfont">Description : {" "}</span>  : {movie.movieDesc}
                  </p>

                  <br />

                  <p className="text-white font1"><span className="boldfont">Time : {" "}</span> {movie.movieTime}</p>

                  <br />

                  <p className="text-white font1">
                  <span className="boldfont">Ticket Price :  {" "}</span> {movie.moviePrice}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="container p15">
          <h2 className="custoemfont">Seating Chart</h2>
          <div className="flex flex-wrap customcontainer">
            <div className="monoter">
              <div> <p>screen</p></div>
            </div>
            {chairs.map((chair, index) => {
              return (
                <>
                  {chair === 0 && <div className="set">{index + 1}</div>}
                  {chair === 1 && (
                    <div
                      onClick={handleticketchair(index)}
                      className="set bg-succes"
                    >
                      {index + 1}
                    </div>
                  )}
                  {chair === 2 && (
                    <div
                      className="set bg-green"
                      onClick={cancelhandleticketchair(index)}
                    >
                      {index + 1}
                    </div>
                  )}
                </>
              );
            })}
          </div>
          {movie && (
            <p className="custoemfont">
              total price: {counter * parseInt(movie.moviePrice)}
            </p>
          )}
          {counter && (
            <button className="btn btn-primary" onClick={bookatickets}>
              bookatickets
            </button>
          )}
        </div>
        {flag && (
          <div className="formd">
            <h3 className="custoemfont">
              Enter your visa info takes for 1 time
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="cardName" className="text-white">
                  Name on Card:
                </label>
                <input
                  type="text"
                  className="form-control text-white bg-transparent border border-primary"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber" className="text-white">
                  Credit Card Number:
                </label>
                <input
                  type="text"
                  className="form-control text-white bg-transparent border border-primary"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  placeholder="Enter your credit card number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="col-md-6 form-group">
                  <label htmlFor="cardDate" className="text-white">
                    Expiry Date:
                  </label>
                  <input
                    type="text"
                    className="form-control text-white bg-transparent border border-primary"
                    id="cardDate"
                    name="cardDate"
                    value={formData.cardDate}
                    placeholder="MM/YY"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="cardCvv" className="text-white">
                    CVV:
                  </label>
                  <input
                    type="text"
                    className="form-control text-white bg-transparent border border-primary"
                    id="cardCvv"
                    name="cardCvv"
                    value={formData.cardCvv}
                    placeholder="Enter CVV"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default MovieDetails;
