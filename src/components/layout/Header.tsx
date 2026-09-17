import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">Project Management System</div>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contacts
            </NavLink>
          </li>
          <li>Projects</li>
          <li>
            <NavLink
              to="/examples"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Examples
            </NavLink>
          </li>
          <li>Tasks</li>
          <li>Settings</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
