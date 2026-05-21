import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import {
  AnimatePresence
} from "framer-motion";

import {
  lazy,
  Suspense,
  useEffect,
  useState
} from "react";

import {
  useAuth
} from "./contexts/AuthContext";

import ProtectedRoute
from "./routes/ProtectedRoute";

/* LAYOUT */

import MainLayout
from "./layouts/MainLayout";

/* AUTH PAGE */

import Auth
from "./pages/Auth";

/* LAZY PAGES */

const Dashboard =
lazy(()=>import("./pages/Dashboard"));

const Tasks =
lazy(()=>import("./pages/Tasks"));

const Planner =
lazy(()=>import("./pages/Planner"));

const Focus =
lazy(()=>import("./pages/Focus"));

const Analytics =
lazy(()=>import("./pages/Analytics"));

const Settings =
lazy(()=>import("./pages/Settings"));

/* LOADER */

const Loader = () => {

  return(

    <div className="loader-screen">

      <div className="loader-circle"></div>

      <h2>

        Loading FocusFlow AI...

      </h2>

    </div>

  );

};

function App(){

  const location =
  useLocation();

  const {
    user
  } = useAuth();

  /* =========================
     THEME SYSTEM
  ========================= */

  const [darkMode,setDarkMode] =
  useState(true);

  /* LOAD THEME */

  useEffect(()=>{

    const savedTheme =
    localStorage.getItem(
      "focusflow-theme"
    );

    if(savedTheme){

      setDarkMode(
        savedTheme === "dark"
      );

    }

  },[]);

  /* APPLY + SAVE THEME */

  useEffect(()=>{

    localStorage.setItem(

      "focusflow-theme",

      darkMode
      ? "dark"
      : "light"

    );

    if(darkMode){

      document.body.classList.remove(
        "light-theme"
      );

    }else{

      document.body.classList.add(
        "light-theme"
      );

    }

  },[darkMode]);

  return(

    <Suspense
      fallback={<Loader />}
    >

      <AnimatePresence mode="wait">

        <Routes
          location={location}
          key={location.pathname}
        >

          {/* AUTH */}

          <Route
            path="/auth"
            element={
              user
              ? <Dashboard />
              : <Auth />
            }
          />

          {/* PROTECTED APP */}

          <Route
            path="/*"
            element={

              <ProtectedRoute>

                <MainLayout>

                  <Routes>

                    <Route
                      path="/"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/tasks"
                      element={<Tasks />}
                    />

                    <Route
                      path="/planner"
                      element={<Planner />}
                    />

                    <Route
                      path="/focus"
                      element={<Focus />}
                    />

                    <Route
                      path="/analytics"
                      element={<Analytics />}
                    />

                    <Route
                      path="/settings"
                      element={

                        <Settings
                          darkMode={darkMode}
                          setDarkMode={setDarkMode}
                        />

                      }
                    />

                  </Routes>

                </MainLayout>

              </ProtectedRoute>

            }
          />

        </Routes>

      </AnimatePresence>

    </Suspense>

  );

}

export default App;