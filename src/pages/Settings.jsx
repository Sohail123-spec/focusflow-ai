import {
  useEffect,
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  MdSettings,
  MdDarkMode,
  MdLightMode,
  MdTimer,
  MdPerson
} from "react-icons/md";

import PageWrapper
from "../components/PageWrapper";

import Toast
from "../components/Toast";

import {
  useAuth
} from "../contexts/AuthContext";

import {
  loadSettings,
  saveSettings
} from "../firebase/firestore";

const Settings = ({

  darkMode,
  setDarkMode

}) => {

  const {
    user
  } = useAuth();

  /* STATES */

  const [displayName,setDisplayName] =
  useState("");

  const [focusDuration,setFocusDuration] =
  useState(25);

  const [dailyGoal,setDailyGoal] =
  useState(4);

  const [toast,setToast] =
  useState("");

  const [isLoaded,setIsLoaded] =
  useState(false);

  /* LOAD SETTINGS */

  useEffect(()=>{

  const fetchSettings =
  async ()=>{

    if(user){

      const savedSettings =
      await loadSettings(
        user.id
      );

      if(savedSettings){

        setDisplayName(
          savedSettings.displayName
          ||
          user.username
        );

        setFocusDuration(
          savedSettings.focusDuration
          ||
          25
        );

        setDailyGoal(
          savedSettings.dailyGoal
          ||
          4
        );

      }

      setIsLoaded(true);

    }

  };

  fetchSettings();

},[user]);

  /* SAVE SETTINGS */

  useEffect(()=>{

    if(user && isLoaded){

      saveSettings(

  user.id,

  {

    displayName,

    focusDuration,

    dailyGoal

  }

);

    }

  },[
    displayName,
    focusDuration,
    dailyGoal,
    user,
    isLoaded
  ]);

  /* TOAST */

  const showToast = (message) => {

    setToast(message);

    setTimeout(()=>{

      setToast("");

    },2000);

  };

  return(

    <PageWrapper>

      <div className="dashboard-page">

        {/* HERO */}

        <motion.section
          className="dashboard-hero"
          initial={{
            opacity:0,
            y:30
          }}
          animate={{
            opacity:1,
            y:0
          }}
        >

          <div>

            <h1>

              App Settings ⚙️

            </h1>

            <p>

              Customize your FocusFlow AI
              experience,
              personalize productivity,
              and manage your preferences.

            </p>

          </div>

        </motion.section>

        {/* TOAST */}

        {
          toast && (

            <Toast
              message={toast}
            />

          )
        }

        {/* SETTINGS GRID */}

        <div className="settings-grid">

          {/* PROFILE */}

          <motion.div
            className="
            settings-card
            ui-card
            "
            initial={{
              opacity:0,
              y:20
            }}
            animate={{
              opacity:1,
              y:0
            }}
          >

            <div className="settings-icon">

              <MdPerson />

            </div>

            <h2>

              Profile Settings

            </h2>

            <input
              type="text"
              className="ui-input"
              placeholder="Display Name"
              value={displayName}
              onChange={(e)=>
                setDisplayName(
                  e.target.value
                )
              }
            />

            <button
              className="ui-button"
              onClick={()=>
                showToast(
                  "Profile Updated ✅"
                )
              }
            >

              Save Profile

            </button>

          </motion.div>

          {/* THEME */}

          <motion.div
            className="
            settings-card
            ui-card
            "
            initial={{
              opacity:0,
              y:20
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              delay:0.1
            }}
          >

            <div className="settings-icon">

              {
                darkMode

                ? <MdDarkMode />

                : <MdLightMode />
              }

            </div>

            <h2>

              Appearance

            </h2>

            <p className="text-secondary">

              Switch between
              dark and light themes.

            </p>

            <button
              className="ui-button"
              onClick={()=>
                setDarkMode(
                  !darkMode
                )
              }
            >

              {
                darkMode

                ? "Switch to Light"

                : "Switch to Dark"
              }

            </button>

          </motion.div>

          {/* PRODUCTIVITY */}

          <motion.div
            className="
            settings-card
            ui-card
            "
            initial={{
              opacity:0,
              y:20
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              delay:0.2
            }}
          >

            <div className="settings-icon">

              <MdTimer />

            </div>

            <h2>

              Productivity Preferences

            </h2>

            <label>

              Focus Duration (minutes)

            </label>

            <input
              type="number"
              className="ui-input"
              value={focusDuration}
              onChange={(e)=>
                setFocusDuration(
                  e.target.value
                )
              }
            />

            <label>

              Daily Focus Goal

            </label>

            <input
              type="number"
              className="ui-input"
              value={dailyGoal}
              onChange={(e)=>
                setDailyGoal(
                  e.target.value
                )
              }
            />

            <button
              className="ui-button"
              onClick={()=>
                showToast(
                  "Preferences Saved 🎯"
                )
              }
            >

              Save Preferences

            </button>

          </motion.div>

        </div>

      </div>

    </PageWrapper>

  );

};

export default Settings;