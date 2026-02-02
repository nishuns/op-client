import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/actions";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line
    dispatch(logout());
  }, [dispatch]);

  return <Navigate to="/" />;
};

export default Logout;
