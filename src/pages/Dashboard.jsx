import {
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaBolt,
  FaRocket,
  FaBrain,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  loadUserData
} from "../utils/storage";
import {
  useAuth
} from "../contexts/AuthContext";
const isThisWeek = (date) => {

  const now = new Date();

  const firstDay = new Date(now);

  firstDay.setDate(
    now.getDate() - now.getDay()
  );

  firstDay.setHours(0,0,0,0);

  return new Date(date) >= firstDay;

};

const isLastWeek = (date) => {

  const now = new Date();

  const firstDayThisWeek = new Date(now);

  firstDayThisWeek.setDate(
    now.getDate() - now.getDay()
  );

  firstDayThisWeek.setHours(0,0,0,0);

  const firstDayLastWeek =
    new Date(firstDayThisWeek);

  firstDayLastWeek.setDate(
    firstDayThisWeek.getDate() - 7
  );

  return (

    new Date(date) >= firstDayLastWeek &&

    new Date(date) < firstDayThisWeek

  );

};
function Dashboard() {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [focusHours, setFocusHours] = useState(0);
  const [productivityScore, setProductivityScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const [recentActivity, setRecentActivity] = useState([]);
  const [taskGrowth, setTaskGrowth] = useState(0);
  const [focusGrowth, setFocusGrowth] = useState(0);
  const [productivityGrowth, setProductivityGrowth] = useState(0);
  const [streakGrowth, setStreakGrowth] = useState(0);
  const [focusPercent, setFocusPercent] = useState(0);
const [taskPercent, setTaskPercent] = useState(0);
const [consistencyPercent, setConsistencyPercent] = useState(0);
useEffect(() => {

  const tasks =
  loadUserData(user.id,"tasks");

const planners =
  loadUserData(user.id,"plans");

const focusSessions =
  loadUserData(user.id,"focusSessions");

  const completedTasks =
    tasks.filter(task => task.completed);

  const totalFocusMinutes =
    focusSessions.reduce(
      (acc, session) => acc + session.duration,
      0
    );

  const score =

  Math.min(

    100,

    (

      completedTasks.length * 10 +

      planners.length * 5 +

      (totalFocusMinutes / 60) * 10

    )

  );

  setTasksCompleted(completedTasks.length);

  setFocusHours(
    (totalFocusMinutes / 60).toFixed(1)
  );

  setProductivityScore(score);

  const activeDays = new Set();

completedTasks.forEach(task => {

  if(task.completedAt){

    const day =

      new Date(
        task.completedAt
      ).toDateString();

    activeDays.add(day);

  }

});

setStreak(activeDays.size);
  /* TASK GROWTH */

const thisWeekTasks =

  completedTasks.filter(task =>

    task.completedAt &&
    isThisWeek(task.completedAt)

  ).length;

const lastWeekTasks =

  completedTasks.filter(task =>

    task.completedAt &&
    isLastWeek(task.completedAt)

  ).length;

const realTaskGrowth =

  lastWeekTasks > 0

    ? Math.round(

        (
          (
            thisWeekTasks -
            lastWeekTasks
          ) / lastWeekTasks
        ) * 100

      )

    : thisWeekTasks > 0
    ? 100
    : 0;

setTaskGrowth(realTaskGrowth);

/* FOCUS GROWTH */

const thisWeekFocus =

  focusSessions.filter(session =>

    session.completedAt &&
    isThisWeek(session.completedAt)

  ).length;

const lastWeekFocus =

  focusSessions.filter(session =>

    session.completedAt &&
    isLastWeek(session.completedAt)

  ).length;

const realFocusGrowth =

  lastWeekFocus > 0

    ? Math.round(

        (
          (
            thisWeekFocus -
            lastWeekFocus
          ) / lastWeekFocus
        ) * 100

      )

    : thisWeekFocus > 0
    ? 100
    : 0;

setFocusGrowth(realFocusGrowth);

/* PRODUCTIVITY GROWTH */

const realProductivityGrowth =

  Math.round(
    (
      realTaskGrowth +
      realFocusGrowth
    ) / 2
  );

setProductivityGrowth(
  realProductivityGrowth
);

/* STREAK GROWTH */

setStreakGrowth(
  streak > 0
    ? Math.min(streak * 5, 100)
    : 0
);
const focusPercentage =
  Math.min(
    (totalFocusMinutes / 300) * 100,
    100
  );

const taskPercentage =
  Math.min(
    (completedTasks.length / 10) * 100,
    100
  );

const consistency =
  Math.min(
    (
      (
        completedTasks.length +
        focusSessions.length +
        planners.length
      ) / 15
    ) * 100,
    100
  );

setFocusPercent(
  Math.floor(focusPercentage)
);

setTaskPercent(
  Math.floor(taskPercentage)
);

setConsistencyPercent(
  Math.floor(consistency)
);
  /* REAL RECENT ACTIVITY */

const activities = [

  ...completedTasks.map(task => ({

    type:"task",

    text:
      `✅ Completed "${task.text}"`,

    time: task.completedAt

  })),

  ...planners
    .filter(plan => plan.completed)
    .map(plan => ({

      type:"plan",

      text:
        `📚 Finished "${plan.title}"`,

      time: plan.completedAt

    })),

  ...focusSessions.map(session => ({

    type:"focus",

    text:
      `🎯 Focused for ${session.duration} mins`,

    time: session.completedAt

  }))

]

.sort((a,b)=>

  b.time - a.time

)

.slice(0,6);

setRecentActivity(

  activities.length

    ? activities

    : [

        {

          text:
          "🚀 Start your productivity journey",

          time:Date.now()

        }

      ]

);

}, [user]);
const productivityInsight =
  productivityScore >= 80
    ? "Excellent productivity 🚀"
    : productivityScore >= 50
    ? "You're building momentum ⚡"
    : "Stay consistent and keep focusing 🎯";
/* ACHIEVEMENTS */

const achievements = [

  {
    title:"First Task",
    icon:"🚀",
    unlocked:
      tasksCompleted >= 1
  },

  {
    title:"Focus Beginner",
    icon:"🎯",
    unlocked:
      focusHours >= 1
  },

  {
    title:"Task Master",
    icon:"✅",
    unlocked:
      tasksCompleted >= 10
  },

  {
    title:"Consistency King",
    icon:"🔥",
    unlocked:
      streak >= 7
  }

];
  return (

    <div className="dashboard-page">

      {/* HERO */}

      <section className="dashboard-hero">

        <div className="hero-content">

          <span className="hero-badge">
            🚀 Productivity Platform
          </span>

          <h1>
            Your Productivity
            Command Center
          </h1>

          <p>
            Organize tasks, manage focus sessions,
            track progress, and build powerful habits
            with FocusFlow AI.
          </p>

          <div className="hero-actions">

            <button
              className="primary-action"
              onClick={() => navigate("/tasks")}
            >
              Create Task
            </button>

            <button
              className="secondary-action"
              onClick={() => navigate("/focus")}
            >
              Start Focus
            </button>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="stats-grid">

        <div className="premium-stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>

          <p className="stat-title">
            Tasks Completed
          </p>

          <h2 className="stat-value">
            {tasksCompleted}
          </h2>

          <span className="stat-change">
            +{taskGrowth}% this week
          </span>
        </div>

        <div className="premium-stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>

          <p className="stat-title">
            Focus Hours
          </p>

          <h2 className="stat-value">
            {focusHours}h
          </h2>

          <span className="stat-change">
            +{focusGrowth}% this week
          </span>
        </div>

        <div className="premium-stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>

          <p className="stat-title">
            Productivity
          </p>

          <h2 className="stat-value">
            {Math.round(productivityScore)}%
          </h2>

          <span className="stat-change">
            +{productivityGrowth}% this week
          </span>
        </div>

        <div className="premium-stat-card">
          <div className="stat-icon">
            <FaBolt />
          </div>

          <p className="stat-title">
            Current Streak
          </p>

          <h2 className="stat-value">
            {streak}
          </h2>

          <span className="stat-change">
            +{streakGrowth}% consistency
          </span>
        </div>

      </section>

      {/* MAIN GRID */}

      <section className="main-dashboard-grid">

        {/* LEFT */}

        <div className="dashboard-widget large-widget">

          <div className="widget-header">
            <FaBrain />
            <span> Productivity Insights</span>
          </div>

          

            <div className="insight-content">

              <h3>
                {productivityInsight}
              </h3>

              <p>
                Current productivity score:
                {Math.round(productivityScore)}%
              </p>

              <div className="insight-bars">

                <div className="insight-bar">
                  <span>Focus</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${focusPercent}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="insight-bar">
                  <span>Tasks</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${taskPercent}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="insight-bar">
                  <span>Consistency</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${consistencyPercent}%`
                      }}
                    ></div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        

        {/* RIGHT */}

      </section>
      <section className="recent-activity-section">

  <div className="dashboard-widget full-width-widget">

    <div className="widget-header">
      <FaRocket />
      <span> Recent Activity</span>
    </div>

    {

      recentActivity.map((activity,index)=>(

        <div
          className="activity-item"
          key={index}
        >

          <div className="activity-text">

            {activity.text}

          </div>

          <div className="activity-time">

            {
              new Date(
                activity.time
              ).toLocaleString()
            }

          </div>

        </div>

      ))

    }

  </div>

</section>
      {/* ACHIEVEMENTS */}

<section className="achievements-section">

  <div className="dashboard-widget full-width-widget">

    <div className="widget-header">

      🏆 Achievements

    </div>

    <div className="achievements-grid">

      {

        achievements.map((badge,index)=>(

          <div
            key={index}
            className={
              badge.unlocked
              ? "achievement-card unlocked"
              : "achievement-card"
            }
          >

            <div className="achievement-icon">

              {badge.icon}

            </div>

            <h3>

              {badge.title}

            </h3>

            <p>

              {

                badge.unlocked

                ? "Unlocked"

                : "Locked"

              }

            </p>

          </div>

        ))

      }

    </div>

  </div>

</section>
    </div>
  );

}

export default Dashboard;