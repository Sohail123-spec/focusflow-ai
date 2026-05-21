import {
  useEffect,
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  MdTimer,
  MdPlayArrow,
  MdPause,
  MdReplay
} from "react-icons/md";

import PageWrapper
from "../components/PageWrapper";

import Toast
from "../components/Toast";

import {
  useAuth
} from "../contexts/AuthContext";

import {
  saveUserData,
  loadUserData
} from "../utils/storage";

const Focus = () => {

  const {
    user
  } = useAuth();

  /* TIMER */

  const [
    selectedMinutes,
    setSelectedMinutes
  ] = useState(25);

  const defaultTime =
  selectedMinutes * 60;

  const [
    timeLeft,
    setTimeLeft
  ] = useState(defaultTime);

  const [
    isRunning,
    setIsRunning
  ] = useState(false);

  /* STORAGE */

  const [
    sessions,
    setSessions
  ] = useState([]);

  const [
    toast,
    setToast
  ] = useState("");

  const [
    isLoaded,
    setIsLoaded
  ] = useState(false);

  /* LOAD */

  useEffect(()=>{

    if(user){

      const savedSessions =
      loadUserData(
        user.id,
        "focusSessions"
      );

      setSessions(savedSessions);

      setIsLoaded(true);

    }

  },[user]);

  /* SAVE */

  useEffect(()=>{

    if(user && isLoaded){

      saveUserData(
        user.id,
        "focusSessions",
        sessions
      );

    }

  },[
    sessions,
    user,
    isLoaded
  ]);

  /* TIMER LOGIC */

  useEffect(()=>{

    let interval;

    if(isRunning && timeLeft > 0){

      interval =
      setInterval(()=>{

        setTimeLeft(prev =>
          prev - 1
        );

      },1000);

    }

    if(timeLeft === 0){

      completeSession();

    }

    return ()=>clearInterval(interval);

  },[
    isRunning,
    timeLeft
  ]);

  /* FORMAT */

  const formatTime = (seconds) => {

    const mins =
    Math.floor(seconds / 60);

    const secs =
    seconds % 60;

    return `
      ${String(mins).padStart(2,"0")}
      :
      ${String(secs).padStart(2,"0")}
    `;

  };

  /* COMPLETE */

  const completeSession = () => {

    setIsRunning(false);

    const newSession = {

      id:Date.now(),

      duration:selectedMinutes,

      completedAt:Date.now()

    };

    const updatedSessions = [

      newSession,

      ...sessions

    ];

    setSessions(updatedSessions);

    saveUserData(

      user.id,

      "focusSessions",

      updatedSessions

    );

    setTimeLeft(defaultTime);

    showToast(
      "Focus Session Completed 🎯"
    );

  };

  /* STOP SESSION */

  const handleStopSession = () => {

    const completedMinutes =
      Math.ceil(
        (defaultTime - timeLeft) / 60
      );
    if(completedMinutes <= 0){

      setIsRunning(false);

      setTimeLeft(defaultTime);

      return;

    }

    const newSession = {

      id:Date.now(),

      duration:completedMinutes,

      completedAt:Date.now()

    };

    const updatedSessions = [

      newSession,

      ...sessions

    ];

    setSessions(updatedSessions);

    saveUserData(

      user.id,

      "focusSessions",

      updatedSessions

    );

    setIsRunning(false);

    setTimeLeft(defaultTime);

    showToast(

      `Focus session saved (${completedMinutes} mins) 🎯`

    );

  };

  /* TOAST */

  const showToast = (message) => {

    setToast(message);

    setTimeout(()=>{

      setToast("");

    },2000);

  };

  /* TOTAL MINUTES */

  const totalMinutes =
  sessions.reduce(

    (acc,session)=>

      acc + session.duration,

    0

  );

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

              Deep Focus Mode 🎯

            </h1>

            <p>

              Eliminate distractions,
              enter deep work sessions,
              and boost your productivity
              using FocusFlow AI.

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

        {/* TIMER CARD */}

        <motion.div
          className="
          focus-timer-card
          ui-card
          "
          initial={{
            opacity:0,
            y:30
          }}
          animate={{
            opacity:1,
            y:0
          }}
        >

          {/* TIMER PRESETS */}

          <div className="timer-presets">

            {[5,15,25,45,60].map((minute)=>(

              <button
                key={minute}
                className={
                  selectedMinutes === minute
                  ? "preset-btn active"
                  : "preset-btn"
                }
                onClick={()=>{

                  setSelectedMinutes(minute);

                  setTimeLeft(
                    minute * 60
                  );

                }}
              >

                {minute}m

              </button>

            ))}

          </div>

          {/* TIMER ICON */}

          <div className="timer-icon">

            <MdTimer />

          </div>

          {/* TIMER DISPLAY */}

          <h1 className="focus-time">

            {formatTime(timeLeft)}

          </h1>

          {/* ACTIONS */}

          <div className="focus-actions">

            <button
              className="ui-button"
              onClick={()=>
                setIsRunning(true)
              }
            >

              <MdPlayArrow />

              Start

            </button>

            <button
              className="
              ui-button
              secondary-btn
              "
              onClick={()=>
                setIsRunning(false)
              }
            >

              <MdPause />

              Pause

            </button>

            <button
              className="
              ui-button
              stop-btn
              "
              onClick={
                handleStopSession
              }
            >

              Stop

            </button>

            <button
              className="ui-button"
              onClick={()=>{

                setTimeLeft(
                  defaultTime
                );

                setIsRunning(false);

              }}
            >

              <MdReplay />

              Reset

            </button>

          </div>

        </motion.div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="premium-stat-card">

            <div className="stat-title">

              Total Sessions

            </div>

            <div className="stat-value">

              {sessions.length}

            </div>

          </div>

          <div className="premium-stat-card">

            <div className="stat-title">

              Total Focus Time

            </div>

            <div className="stat-value">

              {totalMinutes}m

            </div>

          </div>

        </div>

        {/* HISTORY */}

        <div>

          <h2 className="section-title">

            Focus History

          </h2>

          <div className="task-grid">

            {
              sessions.length === 0

              ? (

                <div className="empty-state ui-card">

                  No focus sessions yet 🎯

                </div>

              )

              : (

                sessions.map(session => (

                  <motion.div
                    key={session.id}
                    className="
                    task-card
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

                    <div>

                      <h3>

                        {session.duration}
                        Minute Focus Session

                      </h3>

                      <p>

                        {
                          new Date(
                            session.completedAt
                          ).toLocaleString()
                        }

                      </p>

                    </div>

                  </motion.div>

                ))

              )
            }

          </div>

        </div>

      </div>

    </PageWrapper>

  );

};

export default Focus;