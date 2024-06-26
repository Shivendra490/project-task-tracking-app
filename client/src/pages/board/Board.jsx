import styles from "./Board.module.css";
import peopleIcon from "../../assets/pepleIcon.svg";
import StatusComponent from "../../components/status-container/StatusComponent";
import { useEffect, useState } from "react";
import { fetchAllStatusTask } from "../../services/task";



const Board = () => {
  const [todoList,setTodList]=useState([])
  const [backlogList,setBacklogList]=useState([])
  const [progressList,setProgressList]=useState([])
  const [doneList,setDoneList]=useState([])

  useEffect(()=>{
    async function fetchAll(){
      const response = await fetchAllStatusTask()
      console.log('useEffect fetchAll status task',response)
      setTodList(response?.data?.todoList)
      setBacklogList(response?.data?.backlogList)
      setProgressList(response?.data?.progressList)
      setDoneList(response?.data?.doneList)
      
      // setAllStatusTask(response.data.data)

    }
    fetchAll()
  },[])
  
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
        <StatusComponent status="Backlog" taskList={backlogList}/>
        <StatusComponent status="To do" taskList={todoList}/>
        <StatusComponent status="In progress" taskList={progressList}/>
        <StatusComponent status="Done" taskList={doneList}/>
      </div>
    </main>
  );
};

export default Board;
