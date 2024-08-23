import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignUpStyles.css";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import Nav from "../Nav/Nav";

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        alert("Failed");
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      alert("Wrong Credentials");
    }
  };

  return (
    <>
      <Nav />
      <div className="login-overlay">
        <div className="login-container">
          <h2>Login</h2>
          <form action="" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="to-second-page">
            <p>New User?</p>
            <p className="second-page-link">
              <Link to={"/signUpPage"}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
