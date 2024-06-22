import styles from "./Home.module.css";
import projectLogoIcon from "../../assets/projectLogoIcon.svg";
import settingIcon from "../../assets/settingIcon.svg";
import analyticsIcon from "../../assets/analyticsIcon.svg";
import boardIcon from "../../assets/boardIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.homePage}>
      <aside className={styles.aside}>
        <div className={styles.asideNav}>
          <div className={styles.linkWrapper}>
            <img className={styles.logo} src={projectLogoIcon} />
            <div className={styles.projectName}>Pro Manage</div>
          </div>
          <div className={styles.linkWrapper}>
            <img className={styles.logo} src={boardIcon} />
            <div className={styles.label}>Board</div>
          </div>
          <div className={styles.linkWrapper}>
            <img className={styles.logo} src={analyticsIcon} />
            <div className={styles.label}>Analytics</div>
          </div>
          <div className={styles.linkWrapper}>
            <img className={styles.logo} src={settingIcon} />
            <div className={styles.label}>Settings</div>
          </div>
        </div>
        <div className={styles.logoutWrapper}>
          <div className={styles.linkWrapper}>
            <img className={styles.logo} src={logoutIcon} />
            <div className={styles.logout}>Logout</div>
          </div>
        </div>
      </aside>
      <div className={styles.outlet}><Outlet/></div>
    </div>
  );
};

export default Home;
