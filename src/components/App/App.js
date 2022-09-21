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
            setIsLoading(true);
            return {...prev, ...res.data, isLoggedIn: true}
          });
          // navigation(-1);
        })
        .catch((err) => console.log(err))
        .finally(setIsLoading(true));
      // } else {
      //   setIsLoading(true)
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
            setIsLoading(true);
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
        setCurrentUser(prev => {
          return {...prev, ...userInfo};
        });
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
    // setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .postMovies(movie, token)
      .then((data) => {
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
    mainApi
      .deleteMovies(savedMovie._id, token)
      .then(() => {
        const newMoviesList = savedMovies.filter(
          (item) => {
            return item._id !== savedMovie._id
          }
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
                <Header isLoading={isLoading}/>
                <Main/>
                <Footer/>
              </>
            }/>
            <Route path="/signin" element={
              <Login signIn={handleAutorize}
                     message={loginInfoMessage}
                     isLoading={isLoading}
              />
            }/>
            <Route path="/signup" element={
              <Register signUp={handleRegister}
                        message={registerInfoMessage}
                        isLoading={isLoading}
              />
            }/>

            <Route path="/movies" element={
              <ProtectedRoute>
                <Navigation/>
                <Movies movies={movies}
                        onSubmit={handleSearchMovies}
                        onSave={handleSaveMovie}
                        onDelete={handleDeleteMovie}
                        searchKeyword={searchKeyword}
                        savedMovies={savedMovies}
                        setAllMovies={setAllMovies}
                        isLoading={isLoading}
                />
                <Footer/>
              </ProtectedRoute>
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRoute>
                <Navigation/>
                <SavedMovies onDelete={handleDeleteMovie}
                             savedMovies={savedMovies}
                             searchKeyword={searchKeyword}
                             isLoading={isLoading}
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
            <Route path="*" element={
              <NotFoundPage/>
            }/>
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
