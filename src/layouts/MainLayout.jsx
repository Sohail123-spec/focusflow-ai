import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = ({children}) => {

  return(

    <div className="app-shell">

      {/* BACKGROUND GLOW */}

      <div className="bg-glow bg-glow-1"></div>

      <div className="bg-glow bg-glow-2"></div>

      <Sidebar />

      <main className="main-content">

        <Topbar />

        {children}

      </main>

    </div>

  );

};

export default MainLayout;