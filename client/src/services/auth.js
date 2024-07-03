import axios from "axios";
import { DOMAIN } from "../constant";

const registerUser = async (userDetails) => {
  try {
    const response = await axios.post(`${DOMAIN}/auth/register`, userDetails);
    return response;
  } catch (err) {
    return err.response;
  }
};

const loginUser = async (userDetails) => {
  try {
    const response = await axios.post(`${DOMAIN}/auth/login`, userDetails);

    return response;
  } catch (err) {
    return err.response;
  }
};

export { registerUser, loginUser };
