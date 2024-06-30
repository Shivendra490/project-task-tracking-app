import styles from "./RegisterLogin.module.css";
import authImg from "../../assets/authImg.png";
// import { TiUserOutline } from "react-icons/ti";

import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import userIcon from "../../assets/userIcon.svg";
import { useEffect, useState } from "react";
import { registerUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../services/localStoage";
import { validateRegisterForm } from "../../utility/validateForm";


const initialUser = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
// const error={userName:"",email:"",password:"",confirmPassword:""}

const Register = () => {
  const [user, setUser] = useState(initialUser);
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
    const response = await registerUser(userDetails);
    setUser(initialUser);
    navigate("/");

    console.log("user", user, "res", response);
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

            <div>
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
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={onChangeHandler}
                />
                <PiEyeLight className={styles.icon} />
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
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={onChangeHandler}
                />
                <PiEyeLight className={styles.icon} />
              </div>
              {error && (
                <p className={styles.error}>{error?.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className={styles.formFooter}>
            <button type="submit" className={styles.primaryBtn}>
              Register
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
