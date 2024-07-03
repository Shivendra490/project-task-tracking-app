import styles from "./Setting.module.css";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import userIcon from "../../assets/userIcon.svg";
import { useEffect, useState } from "react";
import { getUserDetails, updateUserDetails } from "../../services/board";
import { removeUserInfo } from "../../services/localStoage";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utility/notify";
import Loader from "../../components/loader/Loader";
import { IoEyeOffOutline } from "react-icons/io5";
import { validateSettingForm } from "../../utility/validateForm";

const initialUser = {
  userName: "",
  email: "",
  oldPassword: "",
  newPassword: "",
};
const Setting = () => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);
  const [isAnyDetailModified, setIsAnyDetailModified] = useState(false);
  const [isHideOldPwd, setIsHideOldPwd] = useState(true);
  const [isHideNewPwd, setIsHideNewPwd] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const oldPwdEyeController = () => {
    setIsHideOldPwd((prev) => !prev);
  };
  const newPwdEyeController = () => {
    setIsHideNewPwd((prev) => !prev);
  };

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await getUserDetails();
      setLoading(false);
      if (response?.status !== 200) {
        notify(response?.data?.message);
        return;
      }
      setUser({ ...user, ...response?.data?.data });
    } catch (err) {
      notify(err?.response?.data?.message, "error");
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      const errObj = validateSettingForm(user);
      if (errObj) {
        setError(errObj);
        return;
      }
      if (!isAnyDetailModified) {
        return;
      }
      setLoading(true);
      const response = await updateUserDetails(user);
      setLoading(false);
      if (response?.status !== 200) {
        notify(response?.data?.message, "error");
        return;
      }

      setUser({ ...user, ...response?.data?.data });
      notify(response?.data?.message);
      setIsAnyDetailModified(false);
      if (response?.data?.doLogout) {
        notify("Log in again with updated credentials", "info");
        removeUserInfo();
        navigate("/");
      } else {
        localStorage.setItem(
          "userName",
          JSON.stringify(response?.data?.data?.userName)
        );
      }
    } catch (err) {
      notify(err?.response?.data?.message, "error");
      setLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    setIsAnyDetailModified(true);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className={styles.settingPage}>
      <h1 className={styles.heading}>Settings</h1>
      {loading ? (
        <Loader />
      ) : (
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.formBody}>
            <div className={styles.bothFieldErrorWrapper}>
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
              {error && <p className={styles.error}>{error?.userName}</p>}
            </div>
            <div className={styles.bothFieldErrorWrapper}>
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
              {error && <p className={styles.error}>{error?.email}</p>}
            </div>

            <div className={styles.bothFieldErrorWrapper}>
              <div className={styles.fieldWrapper}>
                <CiLock className={styles.icon} />
                <input
                  className={styles.input}
                  type={isHideOldPwd ? "password" : "text"}
                  placeholder="Old Password"
                  name="oldPassword"
                  value={user?.oldPassword}
                  onChange={onChangeHandler}
                />

                {isHideOldPwd ? (
                  <PiEyeLight
                    className={styles.icon}
                    onClick={oldPwdEyeController}
                  />
                ) : (
                  <IoEyeOffOutline
                    className={styles.icon}
                    onClick={oldPwdEyeController}
                  />
                )}
              </div>
              {error && <p className={styles.error}>{error?.oldPassword}</p>}
            </div>
            <div className={styles.bothFieldErrorWrapper}>
              <div className={styles.fieldWrapper}>
                <CiLock className={styles.icon} />
                <input
                  className={styles.input}
                  type={isHideNewPwd ? "password" : "text"}
                  placeholder="New Password"
                  name="newPassword"
                  value={user?.newPassword}
                  onChange={onChangeHandler}
                />

                {isHideNewPwd ? (
                  <PiEyeLight
                    className={styles.icon}
                    onClick={newPwdEyeController}
                  />
                ) : (
                  <IoEyeOffOutline
                    className={styles.icon}
                    onClick={newPwdEyeController}
                  />
                )}
              </div>
              {error && <p className={styles.error}>{error?.newPassword}</p>}
            </div>
          </div>
          <div className={styles.formFooter}>
            <button type="submit" className={styles.primaryBtn}>
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Setting;
