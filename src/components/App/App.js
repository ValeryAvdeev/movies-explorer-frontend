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
// import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const navigation = useNavigate();
  const [currentUser, setCurrentUser] = useState({isLoggedIn: false});

  // информация по ошибкам и приветствие
  // const [popupText, setPopupText] = useState('');
  // const [isInfoToolTip, setIsInfoToolTip] = useState(false);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      console.log(currentUser.isLoggedIn);
      mainApi.getUser()
        .then(res => {
          setCurrentUser((prev) => {
            return {...prev, ...res}
          });
        })
        .catch(err => console.log(`Ошибка в App.js при запросе информации о пользователе ${err}`))
    }
  }, [currentUser.isLoggedIn])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    if (jwt) {
      mainApi.getUser()
        .then((res) => {
          setCurrentUser((prev) => {
            return {...prev, ...res.data, isLoggedIn: true};
          });
          navigation('/movies');
        })
        .catch((error) => console.log(error));
    }
  }, [])

  const onRegister = (name, email, password) => {
    mainApi.signup(name, email, password)
      .then((res) => {
        console.log(res)
        localStorage.setItem('jwt', res.token);
        setCurrentUser((prev) => {
          return {...prev, isLoggedIn: true, email};
        });
        // setPopupText('Вы успешно зарегистрировались!');
        navigation('/movies');
      })
      .catch(() => {
        // setPopupText('Что-то пошло не так!\n' +
        //   'Попробуйте ещё раз.');
        console.log('Что-то пошло не так!\n' +
          'Попробуйте ещё раз.');
      })
  }

  const onLogin = (email, password) => {
    mainApi.signin(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        console.log(res.token);

        setCurrentUser((prev) => {
          return {...prev, isLoggedIn: true, email};
        });
        // setPopupText('Добро пожаловать!');
        navigation('/movies');
      })
      .catch((e) => {
        // setPopupText('Что-то пошло не так!\n' +
        //   'Попробуйте ещё раз.' + e);
        console.log('Что-то пошло не так!\n' +
          'Попробуйте ещё раз.' + e);
      })
  }

  const onSubmitLogOut = () => {
    setCurrentUser(({isLoggedIn: false}));
    navigation('/');
    localStorage.clear();
  }

  // const closePopups = () => {
  //   setIsInfoToolTip(false);
  // }

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
              <Login signIn={onLogin}/>
            }/>
            <Route path='/signup' element={
              <Register signUp={onRegister}/>
            }/>
            <Route path='/*' element={
              <NotFoundPage/>
            }/>
            {/*<Route element={<ProtectedRoute/>}>*/}
            {/*  <Route path='/movies' element={*/}
            {/*    <>*/}
            {/*      <Navigation/>*/}
            {/*      <Movies/>*/}
            {/*      <Footer/>*/}
            {/*    </>*/}
            {/*  }/>*/}
            {/*  <Route path='/saved-movies' element={*/}
            {/*    <>*/}
            {/*      <Navigation/>*/}
            {/*      <SavedMovies/>*/}
            {/*      <Footer/>*/}
            {/*    </>*/}
            {/*  }/>*/}
            {/*  <Route path='/profile' element={*/}
            {/*    <>*/}
            {/*      <Navigation/>*/}
            {/*      <Profile submitOut={onSubmitOut}/>*/}
            {/*    </>*/}
            {/*  }/>*/}
            {/*</Route>*/}

            <Route path='/movies' element={
              <ProtectedRoute>
                <Navigation/>
                <Movies/>
                <Footer/>
              </ProtectedRoute>
            }/>
            <Route path='/saved-movies' element={
              <ProtectedRoute>
                <Navigation/>
                <SavedMovies/>
                <Footer/>
              </ProtectedRoute>
              }/>
              <Route path='/profile' element={
                <ProtectedRoute>
                  <Navigation/>
                  <Profile onSubmitLogOut={onSubmitLogOut}/>
                </ProtectedRoute>
              }/>

          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

// <InfoTooltip
//   text={popupText}
//   isOpen={isInfoToolTip}
//   isClose={closePopups}
// />
