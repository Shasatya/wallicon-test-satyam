import { Link } from "react-router-dom";
import "./HomeStyles.css";
import Nav from "../Nav/Nav";
const Home = () => {
  return (
    <>
      <Nav />
      <div className="home">
        <div className="home-body">
          <h1>Home</h1>
          <button>
            <Link to={"/itemsPage"}>Add Items</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
