import styles from "./Board.module.css";
import peopleIcon from "../../assets/pepleIcon.svg";
import StatusComponent from "../../components/status-container/StatusComponent";



const Board = () => {
  
  return (
    <main className={styles.boardPage}>
      
      <div className={styles.nameDateWrapper}>
        <h2 className={styles.name}>Welcome! Username</h2>
        <div className={styles.date}>12 Jan,2024</div>
      </div>
      <div className={styles.headingFilterWrapper}>
        <div className={styles.boardIconWrapper}>
          <h1 className={styles.heading}>Board</h1>
          <div className={styles.peopleIconWrapper}>
            <img src={peopleIcon} alt="people Icon" />
            <span>Add People</span>
          </div>
        </div>
        <select className={styles.filter}>
          <option value="week">This Week</option>
          <option value="today">Today</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <div className={styles.allStatusContainer}>
        <StatusComponent status="Backlog"/>
        <StatusComponent status="To do"/>
        <StatusComponent status="In progress"/>
        <StatusComponent status="Done"/>
      </div>
    </main>
  );
};

export default Board;
