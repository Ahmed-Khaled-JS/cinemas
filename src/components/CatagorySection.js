import { Link } from 'react-router-dom';

const CatagorySection = ({ catagories }) => {
  return (
    <div class="container">
    <p class="text-center  textCategory">Categories of Movies</p>
      <div class="row" id="main">
        {catagories.map((catagory) => {
          return (
            <div class="col-md-4 pb-5">
              <img
                src={`${catagory.categoryImage}`}
                class="border border-danger border-4 image rounded-4"
                alt="image"
              />
              <p class="text-center pt-3 pe-5">
                <Link
                  class="categoryTitle "
                  to={`/movies/${catagory._id}`}
                >
                  {catagory.categoryName}
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CatagorySection;
