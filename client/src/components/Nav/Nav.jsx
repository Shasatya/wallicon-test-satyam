import "./NavStyles.css";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
const Nav = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="nav">
      <Link to={"/"}>
        <h2>Logo </h2>
      </Link>
      <Link to={"/profilePage"}>
        {currentUser ? (
          <p className="user-name">{currentUser.username.slice(0, 1)}</p>
        ) : (
          <button>
            <Link to={"/loginPage"}>Login</Link>
          </button>
        )}
      </Link>
    </nav>
  );
};

export default Nav;
