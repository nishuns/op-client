import axios from "axios";
import { SET_USER, SET_IS_AUTH } from "./authSlice";
import { clearCredentials } from "../../utils/localStorge";

export const login = (credentials) => (dispatch) => {
  axios
    .post(`${import.meta.env.VITE_APP_PROXY}/api/auth/login`, {
      ...credentials,
    })
    .then((response) => {
      const output = response.data;
      switch (response.status) {
        case 200:
          localStorage.setItem("accessToken", output.token);
          localStorage.setItem("userData", JSON.stringify(output.user));
          dispatch(SET_USER(output.user));
          dispatch(SET_IS_AUTH(true));
          break;
        default:
        //   showNotification("Error! Try Again");
      }
    })
    .catch((error) => {
      // showNotification("Error! Try Again");
    });
};

export const logout = () => (dispatch) => {
  clearCredentials();
  dispatch(SET_USER(null));
  dispatch(SET_IS_AUTH(false));
};
