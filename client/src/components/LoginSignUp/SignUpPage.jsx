import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        alert("Failed");
        return;
      }
      setLoading(false);
      navigate("/loginPage");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("User Already Exists");
    }
  };

  return (
    <>
      <Nav />
      <div className="login-overlay">
        <div className="login-container">
          <h2>Sign Up</h2>
          <form action="" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Name"
              required
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a Password"
              required
              onChange={handleChange}
            />
            {loading && <p>Loading</p>}

            <button type="submit" className="login-button">
              Sign Up
            </button>
          </form>
          <div className="to-second-page">
            <p>Already have an account?</p>
            <p className="second-page-link">
              <Link to={"/loginPage"}>Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
