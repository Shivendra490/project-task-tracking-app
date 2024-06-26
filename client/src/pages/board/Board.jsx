import styles from "./Board.module.css";
import peopleIcon from "../../assets/pepleIcon.svg";
import StatusComponent from "../../components/status-container/StatusComponent";
import { useContext, useEffect } from "react";
import { fetchAllStatusTask } from "../../services/task";

import BoardContext from "../../store/board-context";
// import BoardProvider from "../../store/BoardProvider";

const Board = () => {
  // const [todoList, setTodList] = useState([]);
  // const [backlogList, setBacklogList] = useState([]);
  // const [progressList, setProgressList] = useState([]);
  // const [doneList, setDoneList] = useState([]);
  const boardCtx=useContext(BoardContext)
  console.log('bbord ctx',boardCtx)

  async function fetchAll() {
    const response = await fetchAllStatusTask();
    console.log("useEffect fetchAll status task", response);
    const {todoList,backlogList,progressList,doneList}=response.data
    // setTodList(response?.data?.todoList);
    // setBacklogList(response?.data?.backlogList);
    // setProgressList(response?.data?.progressList);
    // setDoneList(response?.data?.doneList);
    // setAllStatusTask(response.data.data)
    boardCtx.addTocombinedTasks([...todoList,...backlogList,...progressList,...doneList])

  }

  useEffect(() => {
    
    fetchAll();
  }, []);

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
          <StatusComponent status="Backlog" taskList={boardCtx?.backlogTasks} />
          <StatusComponent status="To do" taskList={boardCtx?.todoTasks} />
          <StatusComponent status="In progress" taskList={boardCtx?.progressTasks} />
          <StatusComponent status="Done" taskList={boardCtx?.doneTasks} />
        </div>
      </main>
      
    
  );
};

export default Board;
