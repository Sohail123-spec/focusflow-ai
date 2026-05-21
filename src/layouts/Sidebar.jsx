import {
  MdDashboard,
  MdTaskAlt,
  MdOutlineAnalytics,
  MdSettings
} from "react-icons/md";

import {
  FaBrain
} from "react-icons/fa";

import {
  NavLink
} from "react-router-dom";

import {
  useState
} from "react";

import {
  HiMenuAlt3
} from "react-icons/hi";

const Sidebar = () => {
  const [isOpen,setIsOpen] =
  useState(false);
  const navItems = [

    {
      path:"/",
      icon:<MdDashboard />,
      label:"Dashboard"
    },

    {
      path:"/tasks",
      icon:<MdTaskAlt />,
      label:"Tasks"
    },

    {
      path:"/planner",
      icon:<FaBrain />,
      label:"Planner"
    },

    {
    path:"/focus",
    icon:<FaBrain />,
    label:"Focus"
    },
    
    {
      path:"/analytics",
      icon:<MdOutlineAnalytics />,
      label:"Analytics"
    },

    {
      path:"/settings",
      icon:<MdSettings />,
      label:"Settings"
    }

  ];

  return(

    <>

<button
  className="menu-toggle"
  onClick={()=>
    setIsOpen(!isOpen)
  }
>

  <HiMenuAlt3 />

</button>

<aside
  className={
    isOpen
    ? "sidebar active"
    : "sidebar"
  }
>

      <div className="logo">

        FocusFlow AI

      </div>

      <nav className="nav-links">

        {
          navItems.map((item,index)=>(

            <NavLink
              key={index}
              to={item.path}
              className="nav-item"
              onClick={()=>
                setIsOpen(false)
              }
            >

              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>

            </NavLink>

          ))
        }

      </nav>

    </aside>

</>

  );

};

export default Sidebar;