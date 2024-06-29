import styles from "./Setting.module.css"
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import userIcon from "../../assets/userIcon.svg";
import { useState } from "react";

const initialUser={userName:"",email:"",oldPassword:"",newPassword:""}
const Setting = () => {
  const {user,setUser}=useState(initialUser)
  console.log(setUser)

  const onSubmitHandler=()=>{

  }

  const onChangeHandler=()=>{

  }
  return (
    <div className={styles.settingPage}>
      <h1>Setting Page</h1>
      <section className={styles.right}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <h1 className={styles.formHead}>Register</h1>
          <div className={styles.formBody}>
            <div className={styles.fieldWrapper}>
              <img src={userIcon} className={styles.icon} />

              <input className={styles.input} name="userName" value={user?.userName} onChange={onChangeHandler} type="text" placeholder="Name" />
            </div>
            <div className={styles.fieldWrapper}>
              <PiEnvelopeSimpleLight className={styles.icon} />
              <input className={styles.input} type="text" name="email" value={user?.email} onChange={onChangeHandler} placeholder="Update Email" />
            </div>
            <div className={styles.fieldWrapper}>
              <CiLock className={styles.icon} />
              <input
                className={styles.input}
                type="password"
                placeholder="Old Password"
                name="oldPassword" value={user?.oldPassword} onChange={onChangeHandler}
              />
              <PiEyeLight className={styles.icon} />
            </div>
            <div className={styles.fieldWrapper}>
              <CiLock className={styles.icon} />
              <input
                className={styles.input}
                type="password"
                placeholder="New Password"
                name="newPassword" value={user?.newPassword} onChange={onChangeHandler}
              />
              <PiEyeLight className={styles.icon} />
            </div>
          </div>
          <div className={styles.formFooter}>
            <button type="submit" className={styles.primaryBtn}>Update</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Setting
