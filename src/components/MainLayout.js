import image1 from "../components/images/netflixteaser.png"
const MainLayout = ()=>{
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner sides">
                <div className="carousel-item active back1">
                    <img src={image1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://e0.pxfuel.com/wallpapers/598/344/desktop-wallpaper-movie-background-cool-movie.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg" className="d-block w-100" alt="..." />
                    <div className="back3"></div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );

}
export default MainLayout;