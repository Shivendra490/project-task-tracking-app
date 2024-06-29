import styles from "./Board.module.css";
import peopleIcon from "../../assets/pepleIcon.svg";
import StatusComponent from "../../components/status-container/StatusComponent";
import { useContext, useEffect, useState } from "react";
import { fetchAllStatusTask } from "../../services/task";

import BoardContext from "../../store/board-context";
import AddMember from "./AddMember";
import { getUserInfo } from "../../services/localStoage";

const Board = () => {
  const [addMemberMode,setAddMemberMode]=useState(false)
  const boardCtx = useContext(BoardContext);
  const {userName}=getUserInfo()

  const todoList = [];
  const progressList = [];
  const backlogList = [];
  const doneList = [];
 
  boardCtx?.allTask?.forEach((task) => {
    // console.log("insideforeach", task, index);

    if (task?.status === "todo") {
      console.log("st", task?.status);
      todoList.push(task);
    } else if (task?.status === "backlog") {
      backlogList.push(task);
    } else if (task?.status === "progress") {
      progressList.push(task);
    } else {
      doneList.push(task);
    }
  });
  // console.log("xxxx", todoList, progressList, backlogList, doneList);

  const toggleAddMemberMode=()=>{
    setAddMemberMode(prev=>!prev)
  }

  async function fetchAll() {
    const response = await fetchAllStatusTask();
    console.log("useEffect fetchAll status taskkkkkkkkkkkkkkkkkkkkkkkkkkk", response);
    boardCtx?.replaceAllTask(response?.data?.data);
    boardCtx?.updateMemberList(response?.data?.memberList)
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <main className={styles.boardPage}>
      {addMemberMode && <AddMember onToggleAddMemberMode={toggleAddMemberMode}/>}
      <div className={styles.nameDateWrapper}>
        <h2 className={styles.name}>Welcome! {userName || "User"}</h2>
        <div className={styles.date}>12 Jan,2024</div>
      </div>
      <div className={styles.headingFilterWrapper}>
        <div className={styles.boardIconWrapper}>
          <h1 className={styles.heading}>Board</h1>
          <div className={styles.peopleIconWrapper} onClick={toggleAddMemberMode}>
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
        <StatusComponent container="Backlog" taskList={backlogList} />
        <StatusComponent container="To do" taskList={todoList} />
        <StatusComponent container="In progress" taskList={progressList} />
        <StatusComponent container="Done" taskList={doneList} />
      </div>
    </main>
  );
};

export default Board;
