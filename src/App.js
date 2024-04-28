import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Routes,Route } from 'react-router-dom';
import Signin from './views/Signin';
import SignUp from './views/SignUp';
import Main from './views/Main';
import Movies from './views/Movies';
import MovieDetails from './views/MovieDetails';
import Checkreservation from './views/Checkreservation';
import Admin from './views/Admin';
function App() {
  return (
    <Routes>
      <Route path="/Signin"  element={<Signin />} />
      <Route path="/SignUp"  element={<SignUp />} />
      <Route path="/Movies/:id"  element={<Movies />} />
      <Route path="/Admin"  element={<Admin />} />

      <Route path="/MovieDetails/:id"  element={<MovieDetails />} />
      <Route path="/Checkreservation"  element={<Checkreservation />} />
      <Route path="/"  element={<Main />} />
    </Routes>
  );
}

export default App;
