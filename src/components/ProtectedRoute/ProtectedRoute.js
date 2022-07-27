import React, {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const currentUser = useContext(CurrentUserContext);
  console.log({children});
  console.log(currentUser);

  return currentUser?.isLoggedIn ? children : <Navigate to='/'/>
}

export default ProtectedRoute;
