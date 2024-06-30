import styles from "./Setting.module.css";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import userIcon from "../../assets/userIcon.svg";
import { useEffect, useState } from "react";
import { getUserDetails, updateUserDetails } from "../../services/board";
import { removeUserInfo } from "../../services/localStoage";
import { useNavigate } from "react-router-dom";

const initialUser = {
  userName: "",
  email: "",
  oldPassword: "",
  newPassword: "",
};
const Setting = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const response = await getUserDetails();
    setUser({ ...user, ...response?.data?.data });
    console.log("setting", response);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await updateUserDetails(user);
    setUser({ ...user, ...response?.data?.data });
    if (response?.data?.doLogout) {
      removeUserInfo();
      navigate("/");
    } else {
      localStorage.setItem(
        "userName",
        JSON.stringify(response?.data?.data?.userName)
      );
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className={styles.settingPage}>
      <h1 className={styles.heading}>Settings</h1>

      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.formBody}>
          <div className={styles.fieldWrapper}>
            <img src={userIcon} className={styles.icon} />

            <input
              className={styles.input}
              name="userName"
              value={user?.userName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className={styles.fieldWrapper}>
            <PiEnvelopeSimpleLight className={styles.icon} />
            <input
              className={styles.input}
              type="text"
              name="email"
              value={user?.email}
              onChange={onChangeHandler}
              placeholder="Update Email"
            />
          </div>
          <div className={styles.fieldWrapper}>
            <CiLock className={styles.icon} />
            <input
              className={styles.input}
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              value={user?.oldPassword}
              onChange={onChangeHandler}
            />
            <PiEyeLight className={styles.icon} />
          </div>
          <div className={styles.fieldWrapper}>
            <CiLock className={styles.icon} />
            <input
              className={styles.input}
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={user?.newPassword}
              onChange={onChangeHandler}
            />
            <PiEyeLight className={styles.icon} />
          </div>
        </div>
        <div className={styles.formFooter}>
          <button type="submit" className={styles.primaryBtn}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
