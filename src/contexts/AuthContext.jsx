import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext =
createContext();

export const AuthProvider = ({
  children
}) => {

  const [user,setUser] =
  useState(null);

  const [loading,setLoading] =
  useState(true);

  /* RESTORE SESSION */

  useEffect(()=>{

    const savedUser =
    localStorage.getItem(
      "focusflow-user"
    );

    if(savedUser){

      setUser(
        JSON.parse(savedUser)
      );

    }

    setLoading(false);

  },[]);

  /* LOGIN */

  const login = (
    email,
    password
  ) => {

    const users =
    JSON.parse(

      localStorage.getItem(
        "focusflow-users"
      )

    ) || [];

    const matchedUser =
    users.find(

      user =>

        user.email === email
        &&
        user.password === password

    );

    if(matchedUser){

      localStorage.setItem(

        "focusflow-user",

        JSON.stringify(
          matchedUser
        )

      );

      setUser(
        matchedUser
      );

      return {
        success:true
      };

    }

    return {
      success:false,
      message:"Invalid credentials"
    };

  };

  /* SIGNUP */

  const signup = (
    username,
    email,
    password
  ) => {

    const users =
    JSON.parse(

      localStorage.getItem(
        "focusflow-users"
      )

    ) || [];

    const userExists =
    users.find(
      user =>
      user.email === email
    );

    if(userExists){

      return {
        success:false,
        message:"User already exists"
      };

    }

    const newUser = {

      id:Date.now(),

      username,
      email,
      password

    };

    users.push(newUser);

    localStorage.setItem(

      "focusflow-users",

      JSON.stringify(users)

    );

    localStorage.setItem(

      "focusflow-user",

      JSON.stringify(newUser)

    );

    setUser(newUser);

    return {
      success:true
    };

  };

  /* LOGOUT */

  const logout = () => {

    localStorage.removeItem(
      "focusflow-user"
    );

    setUser(null);

  };

  return(

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () =>
useContext(AuthContext);