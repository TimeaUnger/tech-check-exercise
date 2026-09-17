import { NavLink } from "react-router-dom";

const ExamplesPage = () => {
  return (
    <ul>
      <li>
        <NavLink to="/users-click-count">Users Click Count</NavLink>
      </li>
      <li>
        <NavLink to="/task-organizer">Task Organizer</NavLink>
      </li>
      <li>
        <NavLink to="/create-ref">createRef</NavLink>
      </li>
      <li>
        <NavLink to="/flush-sync">FlushSync</NavLink>
      </li>
      <li>
        <NavLink to="/flush-sync">HydrateRoot</NavLink>
      </li>
    </ul>
  );
};

export default ExamplesPage;
