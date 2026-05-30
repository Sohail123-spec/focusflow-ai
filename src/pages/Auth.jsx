import {
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../contexts/AuthContext";

const Auth = () => {

  const navigate =
  useNavigate();

  const {
    login,
    signup
  } = useAuth();

  const [isLogin,setIsLogin] =
  useState(true);

  const [username,setUsername] =
  useState("");

  const [email,setEmail] =
  useState("");

  const [password,setPassword] =
  useState("");

  const [error,setError] =
  useState("");

  /* HANDLE AUTH */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    let result;

    if(isLogin){

      result = await login(
        email,
        password
      );

    }

    else{

      result = await signup(
        username,
        email,
        password
      );

    }

    if(result.success){

      navigate("/");

    }

    else{

      setError(
        result.message
      );

    }

  };

  return(

    <div className="auth-page">

      {/* LEFT PANEL */}

      <div className="auth-left">

        <motion.div
          initial={{
            opacity:0,
            y:30
          }}
          animate={{
            opacity:1,
            y:0
          }}
        >

          <h1>

            FocusFlow AI

          </h1>

          <p>

            Organize your productivity,
            focus smarter, and manage
            your workflow beautifully.

          </p>

        </motion.div>

      </div>

      {/* RIGHT PANEL */}

      <div className="auth-right">

        <motion.form
          className="auth-card"
          onSubmit={handleSubmit}
          initial={{
            opacity:0,
            scale:0.9
          }}
          animate={{
            opacity:1,
            scale:1
          }}
        >

          <h2>

            {
              isLogin
              ? "Welcome Back"
              : "Create Account"
            }

          </h2>

          <p>

            Continue your productivity
            journey with FocusFlow AI.

          </p>

          {/* USERNAME */}

          {
            !isLogin && (

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>
                  setUsername(
                    e.target.value
                  )
                }
                required
              />

            )
          }

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }
            required
          />

          {/* ERROR */}

          {
            error && (

              <div className="auth-error">

                {error}

              </div>

            )
          }

          {/* BUTTON */}

          <button type="submit">

            {
              isLogin
              ? "Login"
              : "Create Account"
            }

          </button>

          {/* TOGGLE */}

          <div className="auth-toggle">

            {
              isLogin
              ? "New here?"
              : "Already have account?"
            }

            <span
              onClick={()=>
                setIsLogin(
                  !isLogin
                )
              }
            >

              {
                isLogin
                ? " Create Account"
                : " Login"
              }

            </span>

          </div>

        </motion.form>

      </div>

    </div>

  );

};

export default Auth;