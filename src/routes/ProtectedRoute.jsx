import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../contexts/AuthContext";

const ProtectedRoute = ({
  children
}) => {

  const {
    user,
    loading
  } = useAuth();

  if(loading){

    return null;

  }

  if(!user){

    return <Navigate to="/auth" />;

  }

  return children;

};

export default ProtectedRoute;