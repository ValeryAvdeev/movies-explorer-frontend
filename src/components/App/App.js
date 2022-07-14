import './App.css';
import Header from "../Header/Header";
import {Routes, Route} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {useState} from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({isLoggedIn: false});

  return (
    <CurrentUserContext.Povider value={currentUser}>
      <div className="App">
        <div className='App__content'>
          <Routes>
            <Route path='/' element={
              <>
                <Header/>
                <Main/>
                <Footer/>
              </>
            }/>
            <ProtectedRoute>
              <Route path='/movies' element={
                <>
                  <Navigation/>
                  <Movies/>
                  <Footer/>
                </>
              }/>
              <Route path='/saved-movies' element={
                <>
                  <Navigation/>
                  <SavedMovies/>
                  <Footer/>
                </>
              }/>
              <Route path='/profile' element={
                <>
                  <Navigation/>
                  <Profile/>
                </>
              }/>
            </ProtectedRoute>
            <Route path='/signin' element={
              <Login/>
            }/>
            <Route path='/signup' element={
              <Register/>
            }/>
            <Route path='/*' element={
              <NotFoundPage/>
            }/>
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Povider>

  );
}

export default App;
