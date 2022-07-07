import './App.css';
import Header from "../Header/Header";
import {Routes, Route} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Portfolio from "../Main/Portfolio/Portfolio";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";

function App() {
  return (
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
          <Route path='/movies' element={
            <>
              <Header/>
              <Movies/>
            </>
          }/>
          <Route path='/saved-movies' element={
            <SavedMovies/>
          }/>
          <Route path='/profile' element={
            <Portfolio/>
          }/>
          <Route path='/signin' element={
            <Login/>
          }/>
          <Route path='/signup' element={
            <Register/>
          }/>
        </Routes>
      </div>
    </div>

  );
}

export default App;
