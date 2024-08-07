import styles from "./RegisterLogin.module.css";
import authImg from "../../assets/authImg.png";

import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { loginUser } from "../../services/auth";
import { getUserInfo, storeUserInfo } from "../../services/localStoage";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../utility/validateForm";
import { notify } from "../../utility/notify";
import Loader from "../../components/loader/Loader";
import { IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const navigate = useNavigate();
  const { token, email, userId, userName } = getUserInfo();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const eyeController = () => {
    setIsHide((prev) => !prev);
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      const errObj = validateLoginForm(user);
      if (errObj) {
        setError(errObj);
        return;
      }
      setLoading(true);
      const response = await loginUser(user);
      setLoading(false);

      if (response?.status !== 200) {
        notify(response?.data?.message, "error");
        return;
      }

      const { token, userId, email, userName } = response.data.data;
      storeUserInfo(token, userId, email, userName);
      notify(response?.data?.message);
      navigate("/home");
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
      {/* <button onClick={notify}>Notify!</button> */}
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
          <h1 className={styles.formHead}>Login</h1>
          <div className={styles.formBody}>
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
                  type={isHide ? "password" : "text"}
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={onChangeHandler}
                />

                {isHide ? (
                  <PiEyeLight className={styles.icon} onClick={eyeController} />
                ) : (
                  <IoEyeOffOutline
                    className={styles.icon}
                    onClick={eyeController}
                  />
                )}
              </div>
              {error && <p className={styles.error}>{error?.password}</p>}
            </div>
          </div>
          <div className={styles.formFooter}>
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={loading}
            >
              {loading ? <Loader /> : "Login"}
            </button>
            <p className={styles.haveAccount}>Have no account yet?</p>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
