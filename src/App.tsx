import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import ProjectPage from "./pages/ProjectsPage";

function App() {
  return (

    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route 
          index
          element={<DashboardPage />}
        />
        <Route 
          path="projects"
          element={<ProjectPage />}
        />
      </Route>

      <Route 
        path="/login" 
        element={<LoginPage />}
      />
    </Routes>
  );
}

export default App;