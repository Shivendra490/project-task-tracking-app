
import styles from "./NotFound.module.css"
import { useNavigate } from "react-router-dom"


const NotFound = () => {
    const navigate=useNavigate("/")
  return (
    <div className={styles.notFound}>
      <p className={styles.notFoundText}>Page not found</p>
      <button onClick={()=>navigate("/")} className={styles.backBtn}>Back</button>
    </div>
  )
}

export default NotFound
