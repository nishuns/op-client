import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Icon from "../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/actions";

const Login = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const [credentials, setCredetials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredetials({ ...credentials, [name]: value });
  };

  const handleClearField = () => {
    for (let each in credentials) {
      setCredetials({ ...credentials, [each]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
    handleClearField()
  };

  if (!isAuth) {
    return (
      <div className="login-box">
        <form action="" onSubmit={handleSubmit} className="login-form">
          <button type="button" className="close__button">
            <Link to="/">
              <Icon iconName="cross" styleName="close__icon" />
            </Link>
          </button>
          <h3>Log in Here...</h3>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="login-form__input"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            className="login-form__input"
            value={credentials.password}
            onChange={handleChange}
          />
          <button className="login-form__button">Login</button>
        </form>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default Login;
