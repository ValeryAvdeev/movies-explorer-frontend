import React, {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Navigate} from "react-router-dom";
import Preloader from '../Preloader/Preloader';

const ProtectedRoute = ({children}) => {
  const currentUser = useContext(CurrentUserContext);

  if (currentUser.isLoading) {
    return currentUser?.isLoggedIn ? children : <Navigate to='/'/>
  } else {
    return <Preloader/>
  }
}

export default ProtectedRoute;
