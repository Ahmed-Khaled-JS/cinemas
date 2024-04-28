import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/dist/esm/axios";
import baseurl from "../apis";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Link } from "react-router-dom";
const Movies = () => {
  const [movies, setmovies] = useState([]);
  const [moviesname, setmoviesnaem] = useState([]);

  const id = useParams();
  const getdata = async () => {
    console.log(id);
    const response = await axios.get(`${baseurl}/movie?id=${id.id}`,{
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    setmovies(response.data.result);
    setmoviesnaem(response.data.categoryName);
    console.log(response.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <Header />
      <p class="text-center  textCategory" id="title">
        {moviesname}
      </p>
      {movies.map((movie) => {
        return (
          <>
            <div class="col-md-3">
              <img
                src={`${movie.movieImage}`}
                class="border border-danger border-4 image rounded-2"
                alt="image"
              />

              <p class="text-center pt-3 pe-3">
                <Link
                  class="categoryTitle "
                  to={`/moviedetails/${movie._id}`}
                >
                  {movie.movieName}
                </Link>
              </p>
            </div>
          </>
        );
      })}
      <Footer />
    </>
  );
};
export default Movies;
