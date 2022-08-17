import "./App.css";
import Header from "../Header/Header";
import {Routes, Route, useNavigate} from "react-router-dom";
import Main from "../Main/Main";
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
  const token = localStorage.getItem("jwt");

  const [currentUser, setCurrentUser] = useState({isLoggedIn: false});
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState(
    JSON.parse(localStorage.getItem("loadedMovies")) || []
  );
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem("filteredMovies")) || []
  );
  const [searchKeyword, setSearchKeyword] = useState(
    localStorage.getItem("searchKeyword") || ""
  );

  const [profileInfoMessage, setProfileInfoMessage] = useState("");
  const [registerInfoMessage, setRegisterInfoMessage] = useState("");
  const [loginInfoMessage, setLoginleInfoMessage] = useState("");

  useEffect(() => {
    if (token) {
      mainApi
        .getToken(token)
        .then((res) => {
          setCurrentUser(prev => {
            return {...prev, ...res.data, isLoggedIn: true}
          });
          navigation(-1);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      mainApi
        .getUserInfo(token)
        .then((user) => setCurrentUser(prev => {
          return {...prev, ...user};
        }))
        .catch((err) => {
          console.log(`Ошибка получения данных пользователя: ${err}`);
        });

      mainApi
        .getMovies(token)
        .then((res) => {
          setSavedMovies(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
        });

      if (localStorage.filteredMovies) {
        setMovies(filteredMovies);
      }
    }
  }, [currentUser.isLoggedIn, filteredMovies]);

  const handleRegister = ({name, password, email}) => {
    mainApi
      .signup(name, password, email)
      .then((res) => {
        if (res) {
          handleAutorize({password, email});
          setRegisterInfoMessage("Регистрация прошла успешно");
        }
      })
      .catch((err) => {
        switch (err) {
          case 400:
            setRegisterInfoMessage("Некорректно заполнено одно из полей");
            break;
          case 409:
            setRegisterInfoMessage(
              "Пользователь с такой почтой уже зарегистрирован"
            );
            break;
          default:
            setRegisterInfoMessage("Что-то пошло не так ¯_(ツ)_/¯");
        }
      });
  };

  const handleAutorize = ({password, email}) => {
    mainApi
      .signin(password, email)
      .then((data) => {
        mainApi.getToken(data.token).then((res) => {
          if (res) {
            setCurrentUser(prev => {
              return {...prev, ...res, isLoggedIn: true, password, email};
            });
            setTimeout(() => navigation("/movies"), 1000);
            // navigation("/movies");
            setLoginleInfoMessage("Авторизация прошла успешно");
          }
        });
      })
      .catch(() =>
        setLoginleInfoMessage("Вы ввели неправильный email или пароль")
      );
  };

  const handleUpdateUser = (user) => {
    mainApi
      .editProfile(user, token)
      .then((userInfo) => {
        setProfileInfoMessage("Данные пользователя обновлеы успешно");
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`)
        setProfileInfoMessage('Ошибка редактирования данных профиля');
      })
      .finally(() => setTimeout(() => setProfileInfoMessage(''), 1500));
  };

  function searchMovies(movie, name) {
    return movie.filter((m) =>
      m.nameRU.toLowerCase().includes(name.toLowerCase())
    );
  }

  const handleSearchMovies = (name) => {
    setIsLoading(true);
    const newMovies = searchMovies(allMovies, name);
    setMovies(newMovies);
    localStorage.setItem("filteredMovies", JSON.stringify(newMovies));
    setFilteredMovies(newMovies);
    localStorage.setItem("searchKeyword", name);
    setSearchKeyword(name);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSaveMovie = (movie) => {
    console.log(movie);
    mainApi
      .postMovies(movie, token)
      .then((data) => {
        console.log(data);
        setSavedMovies([data, ...savedMovies]);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([data, ...savedMovies])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteMovie = (movie) => {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.movieId
    );
    console.log(savedMovie)
    mainApi
      .deleteMovies(savedMovie._id, token)
      .then(() => {
        const newMoviesList = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        );
        setSavedMovies(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signOut = () => {
    localStorage.removeItem("checkBox");
    localStorage.removeItem("searchKeyword");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("loadedMovies");
    localStorage.removeItem("jwt");
    // setCurrentUser(false);
    setIsLoading(false);
    setAllMovies([]);
    setMovies([]);
    setSavedMovies([]);
    setCurrentUser({isLoggedIn: false});
    setSearchKeyword("");
    setFilteredMovies([]);
    setProfileInfoMessage("");
    setRegisterInfoMessage("");
    setLoginleInfoMessage("");
    navigation("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="App__content">
          <Routes>
            <Route path="/" element={
              <>
                <Header/>
                <Main/>
                <Footer/>
              </>
            }/>
            <Route path="/signin" element={
              <Login signIn={handleAutorize}
                     message={loginInfoMessage}
              />
            }/>
            <Route path="/signup" element={
              <Register signUp={handleRegister}
                        message={registerInfoMessage}
              />
            }/>
            <Route path="/*" element={
              <NotFoundPage/>
            }/>

            <Route path="/movies" element={
              <ProtectedRoute>
                <Navigation/>
                <Movies isLoading={isLoading}
                        movies={movies}
                        onSubmit={handleSearchMovies}
                        onSave={handleSaveMovie}
                        onDelete={handleDeleteMovie}
                        searchKeyword={searchKeyword}
                        savedMovies={savedMovies}
                        setAllMovies={setAllMovies}
                />
                <Footer/>
              </ProtectedRoute>
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRoute>
                <Navigation/>
                <SavedMovies isLoading={isLoading}
                             onDelete={handleDeleteMovie}
                             savedMovies={savedMovies}
                             searchKeyword={searchKeyword}

                />
                <Footer/>
              </ProtectedRoute>
            }/>
            <Route path="/profile" element={
              <ProtectedRoute>
                <Navigation/>
                <Profile onUpdateUser={handleUpdateUser}
                         signOut={signOut}
                         infoMessage={profileInfoMessage}
                />
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
