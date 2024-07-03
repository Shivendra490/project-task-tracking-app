import styles from "./RegisterLogin.module.css";
import authImg from "../../assets/authImg.png";

import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import userIcon from "../../assets/userIcon.svg";
import { useEffect, useState } from "react";
import { registerUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../services/localStoage";
import { validateRegisterForm } from "../../utility/validateForm";
import { notify } from "../../utility/notify";
import Loader from "../../components/loader/Loader";
import { IoEyeOffOutline } from "react-icons/io5";

const initialUser = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHidePwd, setIsHidePwd] = useState(true);
  const [isHideConfirmPwd, setIsHideConfirmPwd] = useState(true);

  const navigate = useNavigate();
  const { token, email, userId, userName } = getUserInfo();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const pwdEyeController = () => {
    setIsHidePwd((prev) => !prev);
  };
  const confirmPwdEyeController = () => {
    setIsHideConfirmPwd((prev) => !prev);
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      const errObj = validateRegisterForm(user);
      if (errObj) {
        setError(errObj);
        return;
      }

      const userDetails = {
        userName: user.userName,
        email: user.email,
        password: user.password,
      };
      setLoading(true);
      const response = await registerUser(userDetails);
      setLoading(false);

      if (response?.status !== 201) {
        notify(response?.data?.message, "error");

        return;
      }

      setUser(initialUser);
      notify(response?.data?.message);
      navigate("/");
    } catch (err) {
      notify(err?.response?.data?.message, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && email && userId && userName) {
      navigate("/home");
    }
  }, []);
  return (
    <div className={styles.authPage}>
      <section className={styles.left}>
        <div className={styles.imgTextContainer}>
          <div className={styles.imgWrapper}>
            <img src={authImg} alt="Auth-image" />
          </div>
          <p className={styles.welcomeText}>Welcome aboard my friend</p>
          <p className={styles.infoText}>
            just a couple of clicks and we start
          </p>
        </div>
      </section>
      <section className={styles.right}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <h1 className={styles.formHead}>Register</h1>
          <div className={styles.formBody}>
            <div className={styles.bothFieldErrorWrapper}>
              <div className={styles.fieldWrapper}>
                <img src={userIcon} className={styles.icon} />
                <input
                  className={styles.input}
                  name="userName"
                  value={user.userName}
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
                  value={user.email}
                  onChange={onChangeHandler}
                  placeholder="Email"
                />
              </div>
              {error && <p className={styles.error}>{error?.email}</p>}
            </div>

            <div className={styles.bothFieldErrorWrapper}>
              <div className={styles.fieldWrapper}>
                <CiLock className={styles.icon} />
                <input
                  className={styles.input}
                  type={isHidePwd ? "password" : "text"}
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={onChangeHandler}
                />
                {isHidePwd ? (
                  <PiEyeLight
                    className={styles.icon}
                    onClick={pwdEyeController}
                  />
                ) : (
                  <IoEyeOffOutline
                    className={styles.icon}
                    onClick={pwdEyeController}
                  />
                )}
              </div>
              {error && (
                <p className={styles.error}>{error?.confirmPassword}</p>
              )}
            </div>

            <div className={styles.bothFieldErrorWrapper}>
              <div className={styles.fieldWrapper}>
                <CiLock className={styles.icon} />
                <input
                  className={styles.input}
                  type={isHideConfirmPwd ? "password" : "text"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={onChangeHandler}
                />
                {isHideConfirmPwd ? (
                  <PiEyeLight
                    className={styles.icon}
                    onClick={confirmPwdEyeController}
                  />
                ) : (
                  <IoEyeOffOutline
                    className={styles.icon}
                    onClick={confirmPwdEyeController}
                  />
                )}
              </div>
              {error && (
                <p className={styles.error}>{error?.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className={styles.formFooter}>
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={loading}
            >
              {loading ? <Loader /> : "Register"}
            </button>
            <p className={styles.haveAccount}>Have an account ?</p>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
