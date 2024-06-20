import styles from "./RegisterLogin.module.css";
import authImg from "../../assets/authImg.png";

import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";

const Login = () => {
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
        <form className={styles.form}>
          <h1 className={styles.formHead}>Login</h1>
          <div className={styles.formBody}>
            <div className={styles.fieldWrapper}>
              <PiEnvelopeSimpleLight className={styles.icon} />
              <input className={styles.input} type="text" placeholder="Email" />
            </div>
            <div className={styles.fieldWrapper}>
              <CiLock className={styles.icon} />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
              />
              <PiEyeLight className={styles.icon} />
            </div>
          </div>
          <div className={styles.formFooter}>
            <button className={styles.primaryBtn}>Login</button>
            <p className={styles.haveAccount}>Have no account yet?</p>
            <button className={styles.secondaryBtn}>Register</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
