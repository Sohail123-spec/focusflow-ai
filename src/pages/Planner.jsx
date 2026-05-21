import {
  useEffect,
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  MdDelete,
  MdCheckCircle
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

const Planner = () => {

  const {
    user
  } = useAuth();

  /* STATES */

  const [title,setTitle] =
  useState("");

  const [category,setCategory] =
  useState("Study");

  const [priority,setPriority] =
  useState("Medium");

  const [dueDate,setDueDate] =
  useState("");

  const [plans,setPlans] =
  useState([]);

  const [toast,setToast] =
  useState("");

  const [isLoaded,setIsLoaded] =
  useState(false);

  /* LOAD */

  useEffect(()=>{

    if(user){

      const savedPlans =
      loadUserData(
        user.id,
        "plans"
      );

      setPlans(savedPlans);

      setIsLoaded(true);

    }

  },[user]);

  /* SAVE */

  useEffect(()=>{

    if(user && isLoaded){

      saveUserData(
        user.id,
        "plans",
        plans
      );

    }

  },[
    plans,
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

  /* ADD PLAN */

  const addPlan = () => {

    if(
      !title.trim()
      ||
      !dueDate
    ) return;

  const newPlan = {

  id:Date.now(),

  title,

  category,

  priority,

  dueDate,

  completed:false,

  createdAt:Date.now(),

  completedAt:null

};

    setPlans([
      newPlan,
      ...plans
    ]);

    setTitle("");

    setDueDate("");

    setCategory("Study");

    setPriority("Medium");

    showToast(
      "Planner Added 📚"
    );

  };

  /* COMPLETE */

  const toggleComplete = (id) => {

    const updatedPlans =
    plans.map(plan =>

      plan.id === id

      ? {
          ...plan,
          completed: !plan.completed,
          completedAt:
          !plan.completed
          ? Date.now()
          : null
          }

      : plan

    );

    setPlans(updatedPlans);

  };

  /* DELETE */

  const deletePlan = (id) => {

    const updatedPlans =
    plans.filter(
      plan => plan.id !== id
    );

    setPlans(updatedPlans);

    showToast(
      "Planner Deleted 🗑️"
    );

  };

  /* FILTERS */

  const activePlans =
  plans.filter(
    plan => !plan.completed
  );

  const completedPlans =
  plans.filter(
    plan => plan.completed
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

              Smart Study Planner 📚

            </h1>

            <p>

              Organize your learning,
              track deadlines,
              and plan your workflow
              effectively with FocusFlow AI.

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

        {/* INPUT SECTION */}

        <div className="planner-form ui-card">

          <input
            type="text"
            placeholder="Planner Title"
            className="ui-input"
            value={title}
            onChange={(e)=>
              setTitle(
                e.target.value
              )
            }
          />

          <select
            size="1"
            className="ui-input"
            value={category}
            onChange={(e)=>
              setCategory(
                e.target.value
              )
            }
          >

            <option>

              Study

            </option>

            <option>

              Project

            </option>

            <option>

              Work

            </option>

            <option>

              Personal

            </option>

          </select>

          <select
            size="1"
            className="ui-input"
            value={priority}
            onChange={(e)=>
              setPriority(
                e.target.value
              )
            }
          >

            <option>

              Low

            </option>

            <option>

              Medium

            </option>

            <option>

              High

            </option>

          </select>

          <input
            type="date"
            className="ui-input"
            value={dueDate}
            onChange={(e)=>
              setDueDate(
                e.target.value
              )
            }
          />

          <button
            className="ui-button"
            onClick={addPlan}
          >

            Add Planner

          </button>

        </div>

        {/* ACTIVE */}

        <div>

          <h2 className="section-title">

            Active Plans

          </h2>

          <div className="planner-grid">

            {
              activePlans.length === 0

              ? (

                <div className="empty-state ui-card">

                  No active plans yet 🚀

                </div>

              )

              : (

                activePlans.map(plan => (

                  <motion.div
                    key={plan.id}
                    className="
                    planner-card
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

                        {plan.title}

                      </h3>

                      <p>

                        {plan.category}

                      </p>

                      <p>

                        Priority:
                        {" "}
                        {plan.priority}

                      </p>

                      <p>

                        Due:
                        {" "}
                        {plan.dueDate}

                      </p>

                    </div>

                    <div className="task-actions">

                      <button
                        className="complete-btn"
                        onClick={()=>
                          toggleComplete(plan.id)
                        }
                      >

                        <MdCheckCircle />

                      </button>

                      <button
                        className="delete-btn"
                        onClick={()=>
                          deletePlan(plan.id)
                        }
                      >

                        <MdDelete />

                      </button>

                    </div>

                  </motion.div>

                ))

              )
            }

          </div>

        </div>

        {/* COMPLETED */}

        <div>

          <h2 className="section-title">

            Completed Plans

          </h2>

          <div className="planner-grid">

            {
              completedPlans.length === 0

              ? (

                <div className="empty-state ui-card">

                  No completed plans

                </div>

              )

              : (

                completedPlans.map(plan => (

                  <motion.div
                    key={plan.id}
                    className="
                    planner-card
                    completed-task
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

                        {plan.title}

                      </h3>

                      <p>

                        Completed Successfully

                      </p>

                    </div>

                    <button
                      className="delete-btn"
                      onClick={()=>
                        deletePlan(plan.id)
                      }
                    >

                      <MdDelete />

                    </button>

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

export default Planner;