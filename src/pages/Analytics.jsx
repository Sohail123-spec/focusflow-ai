import {
  useEffect,
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  MdInsights,
  MdTaskAlt,
  MdTimer,
  MdTrendingUp
} from "react-icons/md";

import PageWrapper
from "../components/PageWrapper";

import {
  useAuth
} from "../contexts/AuthContext";

import {

  loadAnalyticsTasks,

  loadAnalyticsPlans,

  loadAnalyticsFocusSessions

} from "../firebase/firestore";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";

const Analytics = () => {

  const {
    user
  } = useAuth();

  /* STATES */

  const [tasks,setTasks] =
  useState([]);

  const [plans,setPlans] =
  useState([]);

  const [sessions,setSessions] =
  useState([]);

  /* LOAD DATA */

  useEffect(()=>{

  const fetchAnalytics =
  async ()=>{

    if(user){

      const savedTasks =
      await loadAnalyticsTasks(
        user.id
      );

      const savedPlans =
      await loadAnalyticsPlans(
        user.id
      );

      const savedSessions =
      await loadAnalyticsFocusSessions(
        user.id
      );

      setTasks(savedTasks);

      setPlans(savedPlans);

      setSessions(savedSessions);

    }

  };

  fetchAnalytics();

},[user]);

  /* ANALYTICS */

  const completedTasks =
  tasks.filter(
    task => task.completed
  ).length;

  const activeTasks =
  tasks.filter(
    task => !task.completed
  ).length;

  const completedPlans =
  plans.filter(
    plan => plan.completed
  ).length;

  const totalFocusMinutes =
  sessions.reduce(

    (acc,session)=>

      acc + session.duration,

    0

  );

  /* PRODUCTIVITY SCORE */

  /* SMART PRODUCTIVITY SCORE */

const taskScore =

  Math.min(
    completedTasks * 8,
    40
  );

const focusScore =

  Math.min(
    (totalFocusMinutes / 60) * 5,
    35
  );

const plannerScore =

  Math.min(
    completedPlans * 5,
    15
  );

const consistencyScore =

  Math.min(
    sessions.length * 2,
    10
  );

const productivityScore =

  Math.floor(

    taskScore +

    focusScore +

    plannerScore +

    consistencyScore

  );
  /* SMART INSIGHT */

let productivityInsight = "";

if(productivityScore >= 85){

  productivityInsight =
  "Excellent productivity balance 🚀";

}

else if(productivityScore >= 60){

  productivityInsight =
  "You're building strong consistency 🔥";

}

else if(productivityScore >= 40){

  productivityInsight =
  "Good progress. Focus sessions can improve further ⚡";

}

else{

  productivityInsight =
  "Start completing more focused sessions 🎯";

}
/* REAL WEEKLY ANALYTICS */

const days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

/* TASK DATA */

const weeklyTaskData = days.map((day) => {

  const dayTasks =
    tasks.filter((task) => {

      if(!task.completed) return false;

      if(!task.completedAt) return false;

      const taskDay =
        new Date(
          task.completedAt
        ).getDay();

      return days[taskDay] === day;

    }).length;

  return {

    day,
    tasks: dayTasks

  };

});

/* FOCUS DATA */
const focusTrendData = days.map((day) => {

  const totalFocus =
    sessions
      .filter((session) => {

        if(!session.completedAt)
          return false;

        const sessionDay =
          new Date(
            session.completedAt
          ).getDay();

        return (
          days[sessionDay] === day
        );

      })
      .reduce(

        (acc,session)=>

          acc + session.duration,

        0

      );

  return {

    day,

    focus: totalFocus

  };

});
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

              Productivity Analytics 📊

            </h1>

            <p>

              Track your productivity,
              monitor progress,
              and gain powerful insights
              into your workflow.

            </p>

          </div>

        </motion.section>

        {/* STATS */}

        <section className="stats-grid">

          <motion.div
            className="premium-stat-card"
            initial={{
              opacity:0,
              y:20
            }}
            animate={{
              opacity:1,
              y:0
            }}
          >

            <div className="stat-icon">

              <MdTaskAlt />

            </div>

            <div className="stat-title">

              Completed Tasks

            </div>

            <div className="stat-value">

              {completedTasks}

            </div>

          </motion.div>

          <motion.div
            className="premium-stat-card"
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

            <div className="stat-icon">

              <MdInsights />

            </div>

            <div className="stat-title">

              Completed Plans

            </div>

            <div className="stat-value">

              {completedPlans}

            </div>

          </motion.div>

          <motion.div
            className="premium-stat-card"
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

            <div className="stat-icon">

              <MdTimer />

            </div>

            <div className="stat-title">

              Focus Minutes

            </div>

            <div className="stat-value">

              {totalFocusMinutes}

            </div>

          </motion.div>

          <motion.div
            className="premium-stat-card"
            initial={{
              opacity:0,
              y:20
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              delay:0.3
            }}
          >

            <div className="stat-icon">

              <MdTrendingUp />

            </div>

            <div className="stat-title">

              Productivity Score

            </div>

            <div className="stat-value">

              {productivityScore}%

            </div>

          </motion.div>

        </section>

        {/* ANALYTICS GRID */}

        <section className="main-dashboard-grid">

          {/* OVERVIEW */}

          <motion.div
            className="
            dashboard-widget
            large-widget
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

            <div className="widget-header">

              Performance Overview

            </div>

            <div className="activity-list">

              <div className="activity-item">

                ✅ Active Tasks:
                {" "}
                {activeTasks}

              </div>
              
              <div className="activity-item">

                📚 Total Plans:
                {" "}
                {plans.length}

              </div>

              <div className="activity-item">

                🎯 Focus Sessions:
                {" "}
                {sessions.length}

              </div>

              <div className="activity-item">

                🚀 Productivity:
                {" "}
                {productivityScore}%

              </div>

            </div>
            <div className="analytics-insight">

                  {productivityInsight}

                </div>
          </motion.div>

          {/* PRODUCTIVITY RING */}

          <motion.div
            className="dashboard-widget"
            initial={{
              opacity:0,
              y:30
            }}
            animate={{
              opacity:1,
              y:0
            }}
          >

            <div className="widget-header">

              Productivity Level

            </div>

            <div
              className="focus-ring"
              style={{

                background:
                `conic-gradient(
                  #38bdf8
                  ${productivityScore}%,
                  rgba(255,255,255,0.08) 0
                )`

              }}
            >

              <div className="focus-ring-inner">

                {productivityScore}%

              </div>

            </div>

          </motion.div>

        </section>
        {/* CHARTS */}

<section className="analytics-charts-grid">

  {/* TASK CHART */}
              
  <motion.div
    className="dashboard-widget chart-widget"
    initial={{
      opacity:0,
      y:30
    }}
    animate={{
      opacity:1,
      y:0
    }}
  >

    <div className="widget-header">

      Weekly Task Progress

    </div>
    
    {
  weeklyTaskData.every(
    item => item.tasks === 0
  )

  ? (

    <div className="empty-state">

      No task analytics yet 📊

    </div>

  )

  : (

    <ResponsiveContainer
      width="100%"
      height={280}
    >

      <LineChart
        data={weeklyTaskData}
      >

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.05)"
        />

        <XAxis
          dataKey="day"
          stroke="#94a3b8"
        />

        <YAxis
          stroke="#94a3b8"
        />

        <Tooltip
          formatter={(value) => [value, "Tasks Completed"]}
        />

        <Line
          type="monotone"
          dataKey="tasks"
          stroke="#8b5cf6"
          strokeWidth={4}
          dot={{ r:5 }}
        />

      </LineChart>

    </ResponsiveContainer>

  )
}

  </motion.div>

  {/* FOCUS CHART */}

  <motion.div
    className="dashboard-widget chart-widget"
    initial={{
      opacity:0,
      y:30
    }}
    animate={{
      opacity:1,
      y:0
    }}
    transition={{
      delay:0.2
    }}
  >

    <div className="widget-header">

      Focus Hours Trend

    </div>
    
    {
  focusTrendData.every(
    item => item.focus === 0
  )

  ? (

    <div className="empty-state">

      No focus analytics yet 🎯

    </div>

  )

  : (

    <ResponsiveContainer
      width="100%"
      height={280}
    >

      <AreaChart
        data={focusTrendData}
      >

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.05)"
        />

        <XAxis
          dataKey="day"
          stroke="#94a3b8"
        />

        <YAxis
          stroke="#94a3b8"
          tickFormatter={(value) => `${value}m`}
        />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="focus"
          stroke="#38bdf8"
          fill="#38bdf8"
          fillOpacity={0.35}
          strokeWidth={3}
        />

      </AreaChart>

    </ResponsiveContainer>

  )
}
  </motion.div>

</section>
      </div>

    </PageWrapper>

  );

};

export default Analytics;