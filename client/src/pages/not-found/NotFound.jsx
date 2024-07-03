
import styles from "./NotFound.module.css"
import { useNavigate } from "react-router-dom"


const NotFound = () => {
    const navigate=useNavigate("/")
  return (
    <div className={styles.notFound}>
      <p className={styles.notFoundText}>Page not found</p>
      <div className={styles.center}><button onClick={()=>navigate("/")} className={styles.backBtn}>Back</button></div>
    </div>
  )
}

export default NotFound
