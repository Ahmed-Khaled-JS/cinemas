import { Navigate } from "react-router-dom";
import "../components/Css/main.css";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useState, useEffect } from "react";
import axios from "../../node_modules/axios/dist/esm/axios";
import baseurl from "../apis";

const Admin = () => {
  const [userRole, setUserRole] = useState("");
  const [tecki, settecki] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");
  const [message, setMessage] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [movieTime, setMovieTime] = useState("");
  const [moviePrice, setMoviePrice] = useState("");
  const [movieImage, setMovieImage] = useState(null);
  const [categoryOfMovie, setCategoryOfMovie] = useState("");
  const [message2, setMessage2] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [message4, setMessage4] = useState("");
  const [catagories, setCatagories] = useState([]);

  const handleFileChange2 = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("categoryImage", categoryImage);

    try {
      const response = await axios.post(
        `${baseurl}/admin/addCategory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: sessionStorage.getItem("token"),
          },
        }
      );
      setMessage4(response.data.message);
      setCategoryName("");
      setCategoryImage(null);
    } catch (error) {
      setMessage4(error.response.data.message);
    }
  };

  useEffect(async() => {
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
    const tokendetails = async () => {
      const token = sessionStorage.getItem("token"); // Assuming the token is stored in local storage
      if (token && token !== "undefined") {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      }
      const response = await axios.get(`${baseurl}/admin/show`, {
        headers: {
          Authorization: `${sessionStorage.getItem("token")}`,
        },
      });
      
      settecki(response.data.result);
      console.log(response.data);
    };

    tokendetails();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    setUserRole("");
  };

  if (
    !sessionStorage.getItem("token") ||
    sessionStorage.getItem("token") === "undefined"
  ) {
    sessionStorage.removeItem("token");
    return <Navigate to="/signIn" />;
  }
  const Cancelreservation = (e) => async () => {
    console.log(e);
    const response2 = await axios.delete(`${baseurl}/admin/cancelreservation`, {
      data: { id: e },
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    console.log(response2);
    const response = await axios.get(`${baseurl}/admin/show`, {
      headers: {
        Authorization: `${sessionStorage.getItem("token")}`,
      },
    });
    settecki(response.data.result);
  };
  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`${baseurl}/admin/deleteUser`, {
        data: { id: idToDelete },
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setMessage(response.data.message); // Assuming API sends a message upon success
    } catch (error) {
      setMessage(error.response.data.error); // Assuming API sends error message
    }
  };
  const handleDeleteMovie = async () => {
    try {
      const response = await axios.delete(`${baseurl}/admin/deleteMovie`, {
        data: { id: idToDelete },
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setMessage(response.data.message); // Assuming API sends a message upon success
    } catch (error) {
      setMessage(error.response.data.error); // Assuming API sends error message
    }
  };

  const handleFileChange = (e) => {
    setMovieImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("movieName", movieName);
    formData.append("movieDesc", movieDesc);
    formData.append("movieTime", movieTime);
    formData.append("moviePrice", moviePrice);
    formData.append("movieImage", movieImage);
    formData.append("categoryOfMovie", categoryOfMovie);

    try {
      const response = await axios.post(`${baseurl}/admin/addMovie`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.getItem("token"),
        },
      });
      setMessage2(response.data.message);
      setMovieName("");
      setMovieDesc("");
      setMovieTime("");
      setMoviePrice("");
      setMovieImage(null);
      setCategoryOfMovie("");
    } catch (error) {
      setMessage2(error.response.data.message);
    }
  };
  return (
    <>
      <Header logout={logout} userRole={userRole} />
      <div class="container" style={{ marginTop: "100px" }}>
        {tecki && (
          <>
            {tecki.map((res) => {
              return (
                <>
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">{res.movieName}</h4>
                      <h4 className="card-title">{res.userId.email}</h4>
                      <p className="card-text">
                        Number of Tickets: {res.seats.length}
                      </p>
                      <a
                        className="btn btn-danger"
                        onClick={Cancelreservation(res._id)}
                      >
                        Cancel reservation
                      </a>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
      <div className="container yahyamidan">
        <input
          type="text"
          value={idToDelete}
          onChange={(e) => setIdToDelete(e.target.value)}
        />
        <button className="btn btn-danger" onClick={handleDeleteMovie}>
          Delete Movie
        </button>
        <button className="btn btn-danger" onClick={handleDeleteUser}>
          Delete User
        </button>

        <h3>{message}</h3>
      </div>
      <div className="container AddMovie">
        <h2>Add Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="movieName" className="form-label">
              Movie Name:
            </label>
            <input
              type="text"
              id="movieName"
              className="form-control"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="movieDesc" className="form-label">
              Movie Description:
            </label>
            <input
              type="text"
              id="movieDesc"
              className="form-control"
              value={movieDesc}
              onChange={(e) => setMovieDesc(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="movieTime" className="form-label">
              Movie Time:
            </label>
            <input
              type="text"
              id="movieTime"
              className="form-control"
              value={movieTime}
              onChange={(e) => setMovieTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="moviePrice" className="form-label">
              Movie Price:
            </label>
            <input
              type="text"
              id="moviePrice"
              className="form-control"
              value={moviePrice}
              onChange={(e) => setMoviePrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="movieImage" className="form-label">
              Movie Image:
            </label>
            <input
              type="file"
              id="movieImage"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryOfMovie" className="form-label">
              Category:
            </label>

            <select
              class="form-select border border-danger widthInput text-white"
              id="input4"
              value={categoryOfMovie}
              onChange={(e) => setCategoryOfMovie(e.target.value)}
              required
            >
                {catagories && (
                  <>
                    {catagories.map((category) => {
                      return (
                        <option
                          value={category._id}
                          class=" bg-black text-white"
                        >
                          {category.categoryName}
                        </option>
                      );
                    })}
                  </>
                )}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Movie
          </button>
        </form>
        {message2 && <h3 className="mt-3 text-color">{message2}</h3>}
      </div>
      <div className="container AddMovie">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit2}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name:
            </label>
            <input
              type="text"
              id="categoryName"
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryImage" className="form-label">
              Category Image:
            </label>
            <input
              type="file"
              id="categoryImage"
              className="form-control"
              onChange={handleFileChange2}
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </form>
        {message4 && <p className="mt-3">{message4}</p>}
      </div>
      <Footer />
    </>
  );
};

export default Admin;
