import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Weather</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
