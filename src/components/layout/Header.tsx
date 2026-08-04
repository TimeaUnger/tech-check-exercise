import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">Project Management</div>
      <nav>
        <ul>
          <li>
            <NavLink 
                to="/"
                className={({ isActive}) =>
                  isActive ? "active" : ""
                }
            >
                Dashboard
            </NavLink>
          </li>
          <li>Projects</li>
          <li>Tasks</li>
          <li>Settings</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
