import styles from "./Board.module.css";
import peopleIcon from "../../assets/pepleIcon.svg";
import StatusComponent from "../../components/status-container/StatusComponent";
import { useContext, useEffect, useState } from "react";
import { fetchAllStatusTask } from "../../services/task";

import BoardContext from "../../store/board-context";
import AddMember from "./AddMember";
import { getUserInfo } from "../../services/localStoage";
import { formatDate } from "../../utility/formatDate";
import { notify } from "../../utility/notify";
import Loader from "../../components/loader/Loader";

const Board = () => {
  const [addMemberMode, setAddMemberMode] = useState(false);
  const boardCtx = useContext(BoardContext);
  const [filter, setFilter] = useState("week");
  const [loading, setLoading] = useState(false);
  const { userName } = getUserInfo();

  const onChangeFilterHandler = (e) => {
    setFilter(e.target.value);
  };

  const todoList = [];
  const progressList = [];
  const backlogList = [];
  const doneList = [];

  boardCtx?.allTask?.map((task) => {
    if (task?.status === "todo") {
      todoList.push(task);
    } else if (task?.status === "backlog") {
      backlogList.push(task);
    } else if (task?.status === "progress") {
      progressList.push(task);
    } else {
      doneList.push(task);
    }
  });

  const toggleAddMemberMode = () => {
    setAddMemberMode((prev) => !prev);
  };

  async function fetchAll(filter) {
    try {
      setLoading(true);
      const response = await fetchAllStatusTask(filter);
      setLoading(false);

      if (response?.status !== 200) {
        notify(response?.data?.message, "error");
        return;
      }

      boardCtx?.replaceAllTask(response?.data?.data);
      boardCtx?.updateMemberList(response?.data?.memberList);
    } catch (err) {
      notify(err?.response?.data?.message, "error");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll(filter);
  }, [filter]);

  const currentDate = new Date();

  return (
    <main className={styles.boardPage}>
      {addMemberMode && (
        <AddMember onToggleAddMemberMode={toggleAddMemberMode} />
      )}
      <div className={styles.nameDateWrapper}>
        <h2 className={styles.name}>Welcome! {userName || "User"}</h2>
        <div className={styles.date}>{formatDate(currentDate, "full")}</div>
      </div>
      <div className={styles.headingFilterWrapper}>
        <div className={styles.boardIconWrapper}>
          <h1 className={styles.heading}>Board</h1>
          <div
            className={styles.peopleIconWrapper}
            onClick={toggleAddMemberMode}
          >
            <img src={peopleIcon} alt="people Icon" />
            <span>Add People</span>
          </div>
        </div>
        <select
          className={styles.filter}
          value={filter}
          onChange={onChangeFilterHandler}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <div className={styles.allStatusContainer}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <StatusComponent container="Backlog" taskList={backlogList} />
            <StatusComponent container="To do" taskList={todoList} />
            <StatusComponent container="In progress" taskList={progressList} />
            <StatusComponent container="Done" taskList={doneList} />
          </>
        )}
      </div>
    </main>
  );
};

export default Board;
