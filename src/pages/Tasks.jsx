import {
  useEffect,
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  MdDelete,
  MdCheckCircle,
  MdSearch
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

const Tasks = () => {

  const {
    user
  } = useAuth();

  /* STATES */

  const [taskInput,setTaskInput] =
  useState("");

  const [tasks,setTasks] =
  useState([]);

  const [search,setSearch] =
  useState("");

  const [toast,setToast] =
  useState("");
  const [isLoaded,setIsLoaded] =
  useState(false);
  /* LOAD TASKS */

  useEffect(()=>{

  if(user){

    const savedTasks =
    loadUserData(
      user.id,
      "tasks"
    );

    setTasks(savedTasks);

    setIsLoaded(true);

  }

},[user]);

  /* SAVE TASKS */

  useEffect(()=>{

  if(user && isLoaded){

    saveUserData(
      user.id,
      "tasks",
      tasks
    );

  }

},[
  tasks,
  user,
  isLoaded
]);

  /* ADD TASK */

  const addTask = () => {

    if(!taskInput.trim()) return;

    const newTask = {

  id: Date.now(),

  text: taskInput,

  completed:false,

  createdAt:Date.now(),

  completedAt:null

}

    setTasks([
      newTask,
      ...tasks
    ]);

    setTaskInput("");

    showToast(
      "Task Added Successfully ✅"
    );

  };

  /* COMPLETE TASK */

  const toggleTask = (id) => {

    const updatedTasks =
    tasks.map(task =>

      task.id === id

      ? {
          ...task,
          completed: !task.completed,
          completedAt:
          !task.completed
          ? Date.now()
          : null
        }

      : task

    );

    setTasks(updatedTasks);

  };

  /* DELETE TASK */

  const deleteTask = (id) => {

    const updatedTasks =
    tasks.filter(
      task => task.id !== id
    );

    setTasks(updatedTasks);

    showToast(
      "Task Deleted 🗑️"
    );

  };

  /* TOAST */

  const showToast = (message) => {

    setToast(message);

    setTimeout(()=>{

      setToast("");

    },2000);

  };

  /* FILTER TASKS */

  const filteredTasks =
  tasks.filter(task =>

    task.text

    .toLowerCase()

    .includes(

      search.toLowerCase()

    )

  );

  /* ACTIVE TASKS */

  const activeTasks =
  filteredTasks.filter(
    task => !task.completed
  );

  /* COMPLETED TASKS */

  const completedTasks =
  filteredTasks.filter(
    task => task.completed
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

              Smart Task Manager ✅

            </h1>

            <p>

              Organize your workflow,
              manage priorities,
              and stay productive
              with FocusFlow AI.

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

        {/* TASK INPUT */}

        <div className="task-input-wrapper">

          <input
            type="text"
            placeholder="Enter a new task..."
            className="ui-input"
            value={taskInput}
            onChange={(e)=>
              setTaskInput(
                e.target.value
              )
            }
            onKeyDown={(e)=>{

              if(e.key === "Enter"){

                addTask();

              }

            }}
          />

          <button
            className="ui-button"
            onClick={addTask}
          >

            Add Task

          </button>

        </div>

        {/* SEARCH */}

        <div className="task-search-box">

          <MdSearch
            className="search-icon"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            className="ui-input"
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

          {/* DROPDOWN */}

          {
            search &&
            filteredTasks.length > 0 && (

              <div className="search-dropdown">

                {
                  filteredTasks
                  .slice(0,5)
                  .map(task => (

                    <div
                      key={task.id}
                      className="search-item"
                    >

                      {task.text}

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

        {/* ACTIVE TASKS */}

        <div>

          <h2 className="section-title">

            Active Tasks

          </h2>

          <div className="task-grid">

            {
              activeTasks.length === 0

              ? (

                <div className="empty-state ui-card">

                  No active tasks 🚀

                </div>

              )

              : (

                activeTasks.map(task => (

                  <motion.div
                    key={task.id}
                    className="task-card ui-card"
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

                        {task.text}

                      </h3>

                      <p>
                        {
                          new Date(
                            task.createdAt
                          ).toLocaleString()
                        }
                      </p>

                    </div>

                    <div className="task-actions">

                      <button
                        className="complete-btn"
                        onClick={()=>
                          toggleTask(task.id)
                        }
                      >

                        <MdCheckCircle />

                      </button>

                      <button
                        className="delete-btn"
                        onClick={()=>
                          deleteTask(task.id)
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

            Completed Tasks

          </h2>

          <div className="task-grid">

            {
              completedTasks.length === 0

              ? (

                <div className="empty-state ui-card">

                  No completed tasks yet

                </div>

              )

              : (

                completedTasks.map(task => (

                  <motion.div
                    key={task.id}
                    className="
                    task-card
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

                        {task.text}

                      </h3>

                      <p>

                        Completed Successfully

                      </p>

                    </div>

                    <button
                      className="delete-btn"
                      onClick={()=>
                        deleteTask(task.id)
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

export default Tasks;