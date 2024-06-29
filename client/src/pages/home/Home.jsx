import styles from "./Home.module.css";
import projectLogoIcon from "../../assets/projectLogoIcon.svg";
import settingIcon from "../../assets/settingIcon.svg";
import analyticsIcon from "../../assets/analyticsIcon.svg";
import boardIcon from "../../assets/boardIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { removeUserInfo } from "../../services/localStoage";
import { useState } from "react";

const Home = () => {
  const [logoutModal,setLogoutModal]=useState(false)
  const navigate=useNavigate()

  const toggleModal=()=>{
    setLogoutModal(prev=>!prev)
  }

  const logoutHandler=()=>{
    removeUserInfo()
    navigate("/")
  }
  return (
    <div className={styles.homePage}>
      <aside className={styles.aside}>
        <div className={styles.asideNav}>
          <div className={styles.projectNameWrapper}>
            <img className={styles.logo} src={projectLogoIcon} />
            <div className={styles.projectName}>Pro Manage</div>
          </div>
          <NavLink
            to="/home"
            className={(isActive) =>
              isActive
                ? `${styles.linkWrapper} ${styles.active}`
                : `${styles.linkWrapper}`
            }
          >
            <img className={styles.logo} src={boardIcon} />
            <div className={styles.label}>Board</div>
          </NavLink>
          <NavLink
            to="/home/analytics"
            className={(isActive) =>
              isActive
                ? `${styles.linkWrapper} ${styles.active}`
                : `${styles.linkWrapper}`
            }
          >
            <img className={styles.logo} src={analyticsIcon} />
            <div className={styles.label}>Analytics</div>
          </NavLink>
          <NavLink
            to="/home/setting"
            className={(isActive) =>
              isActive
                ? `${styles.linkWrapper} ${styles.active}`
                : `${styles.linkWrapper}`
            }
          >
            <img className={styles.logo} src={settingIcon} />
            <div className={styles.label}>Settings</div>
          </NavLink>
        </div>
        <div className={styles.logoutWrapper}>
          <div className={styles.linkWrapper} onClick={logoutHandler}>
            <img className={styles.logo} src={logoutIcon} />
            <div className={styles.logout}>Logout</div>
          </div>
        </div>
      </aside>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;


