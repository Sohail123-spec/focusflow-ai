import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  auth
} from "../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

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

    const unsubscribe =
    onAuthStateChanged(

      auth,

      (firebaseUser)=>{

        if(firebaseUser){

          setUser({

            id:firebaseUser.uid,

            username:
              firebaseUser.displayName
              || "User",

            email:
              firebaseUser.email

          });

        }

        else{

          setUser(null);

        }

        setLoading(false);

      }

    );

    return unsubscribe;

  },[]);

  /* LOGIN */

  const login = async (
    email,
    password
  ) => {

    try{

      await signInWithEmailAndPassword(

        auth,
        email,
        password

      );

      return {
        success:true
      };

    }

    catch(error){

      return {

        success:false,

        message:error.message

      };

    }

  };

  /* SIGNUP */

  const signup = async (

    username,
    email,
    password

  ) => {

    try{

      const result =

      await createUserWithEmailAndPassword(

        auth,
        email,
        password

      );

      await updateProfile(

        result.user,

        {
          displayName:
          username
        }

      );

      return {
        success:true
      };

    }

    catch(error){

      return {

        success:false,

        message:error.message

      };

    }

  };

  /* LOGOUT */

  const logout = async () => {

    await signOut(auth);

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