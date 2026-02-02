import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Icon from "../../components/Icons";
import axios from "axios";

const Signup = (props) => {
   const [isUserCreated, setUserCreated] = useState(false);
   const [credentials, setCredetials] = useState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
   });

   const [notifier, setNotifier] = useState({
      isVisible: false,
      text: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setCredetials({ ...credentials, [name]: value });
   };

   const handleClearField = () => {
      for (let each in credentials) {
         setCredetials({ ...credentials, [each]: "" });
      }
   };

   const showNotification = (message) => {
      setNotifier({ isVisible: true, text: message });
      setTimeout(() => {
         setNotifier({ ...notifier, isVisible: false });
      }, 2000);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_PROXY}/api/users/add`, {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        password: credentials.password,
      })
      .then((response) => {
            switch (response.status) {
               case 200:
                  handleClearField();
                  //   showNotification("Registered Successfully");
                  setUserCreated(!isUserCreated);
                  break;
               default:
                  showNotification("Err! Try Again");
            }
         })
         .catch((error) => {
            console.log(error);
            showNotification("Error! Try Again");
         });
   };

   if (isUserCreated) {
      return <Navigate to="/" />;
   } else {
      return (
         <div className="signup-box">
            <form action="#" onSubmit={handleSubmit} className="signup-form">
               <Link to="/" className="router-link">
                  <button type="button" className="close__button">
                     <Icon iconName="cross" styleName="close__icon" />
                  </button>
               </Link>
               <h3>Sign in Here...</h3>
               <input
                  type="text"
                  placeholder="First Name"
                  className="signup-form__input"
                  name="firstName"
                  value={credentials.firstName}
                  onChange={handleChange}
               />
               <input
                  type="text"
                  placeholder="Last name"
                  className="signup-form__input"
                  name="lastName"
                  value={credentials.lastName}
                  onChange={handleChange}
               />
               <input
                  type="text"
                  placeholder="Username"
                  className="signup-form__input"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
               />
               <input
                  type="text"
                  placeholder="Email"
                  className="signup-form__input"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
               />
               <input
                  type="text"
                  placeholder="password"
                  className="signup-form__input"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
               />
               <button className="signup-form__button">sign up</button>
               {notifier.isVisible ? (
                  <span className="notification">{notifier.text}</span>
               ) : (
                  <></>
               )}
            </form>
         </div>
      );
   }
};

export default Signup;
