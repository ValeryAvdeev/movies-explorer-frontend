import './App.css';
import Header from "../Header/Header";
import {Routes, Route, useNavigate} from 'react-router-dom';
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
import {useEffect, useState} from "react";
import {mainApi} from "../../utils/MainApi";

function App() {
  const navigation = useNavigate();
  const [currentUser, setCurrentUser] = useState({isLoggedIn: false});

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    if (jwt) {
      mainApi.getUser()
        .then((res) => {
          setCurrentUser((prev) => {
            return {...prev, ...res.data, isLoggedIn: true};
          });
          navigation('/');
        })
        .catch((error) => console.log(error));
    }
  }, [])

  const onRegister = (name, email, password) => {
    mainApi.signup(name, email, password)
      .then(() => {
        navigation('/movies');
      })
      .catch(() => {
        alert('Что-то пошло не так!\n' +
          'Попробуйте ещё раз.');
      })
  }

  const onLogin = (email, password) => {
    mainApi.signin(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setCurrentUser((prev) => {
          return {...prev, isLoggedIn: true, email};
        });
        navigation('/');
      })
      .catch((e) => {
        alert('Что-то пошло не так!\n' +
          'Попробуйте ещё раз.' + e);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            <Route path='/signin' element={
              <Login signin={onLogin}/>
            }/>
            <Route path='/signup' element={
              <Register signUp={onRegister}/>
            }/>
            <Route path='/*' element={
              <NotFoundPage/>
            }/>
            <Route element={<ProtectedRoute/>}>
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
            </Route>
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
