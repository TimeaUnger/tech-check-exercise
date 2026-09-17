import { Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import ProjectPage from "./pages/ContactManagerPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ContactManagerPage from "./pages/ContactManagerPage";
import ContactDetailsPage from "./pages/ContactDetailsPage";
import ExamplesPage from "./pages/ExamplesPage";
import CreateRef from "./components/exercise/CreateRef";
import FlushSync from "./components/exercise/FlushSync";
import HydrateRoot from "./components/exercise/HydrateRoot";
import UsersClickCount from "./components/exercise/UsersClickCount";
import TaskOrganizer from "./components/exercise/TaskOrganizer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="examples" element={<ExamplesPage />} />
        <Route path="create-ref" element={<CreateRef />} />
        <Route path="flush-sync" element={<FlushSync />} />
        <Route path="hydrate-root" element={<HydrateRoot />} />
        <Route path="users-click-count" element={<UsersClickCount />} />
        <Route path="task-organizer" element={<TaskOrganizer />} />

        <Route path="projects/:id" element={<ProjectDetailsPage />} />

        <Route path="contacts" element={<ContactManagerPage />} />
        <Route path="contacts/:id" element={<ContactDetailsPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
