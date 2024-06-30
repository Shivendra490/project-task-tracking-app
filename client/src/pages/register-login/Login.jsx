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

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token, email, userId, userName } = getUserInfo();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const errObj = validateLoginForm(user);
    if (errObj) {
      setError(errObj);
      return;
    }
    const response = await loginUser(user);
    console.log("lguser", response);
    if (response.status !== 200) {
      //show error toast
      return;
    }
    console.log("USERNAMELOGIN", response);
    const { token, userId, email, userName } = response.data.data;
    storeUserInfo(token, userId, email, userName);
    navigate("/home");
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
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={onChangeHandler}
                />
                <PiEyeLight className={styles.icon} />
              </div>
              {error && <p className={styles.error}>{error?.password}</p>}
            </div>
          </div>
          <div className={styles.formFooter}>
            <button type="submit" className={styles.primaryBtn}>
              Login
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
