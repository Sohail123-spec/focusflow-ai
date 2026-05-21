import {
  useAuth
} from "../contexts/AuthContext";

const Topbar = () => {

  const {
    logout,
    user
  } = useAuth();

  const hour =
  new Date().getHours();

  let greeting =
  "Welcome Back 👋";

  if(hour < 12){

    greeting =
    "Good Morning ☀️";

  }

  else if(hour < 18){

    greeting =
    "Good Afternoon 🌤️";

  }

  else{

    greeting =
    "Good Evening 🌙";

  }

  return(

    <header className="topbar fade-up">

      <div>

        <h1>

          {greeting}

        </h1>

        <p>

          Welcome,
          {" "}
          {user?.username}

        </p>

      </div>

      <div className="topbar-actions">

        <button
          className="logout-btn"
          onClick={logout}
        >

          Logout

        </button>

        <div className="profile-box">

          {
            user?.username?.charAt(0)
          }

        </div>

      </div>

    </header>

  );

};

export default Topbar;