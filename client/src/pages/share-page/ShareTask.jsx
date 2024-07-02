import styles from "./ShareTask.module.css";
import projectLogoIcon from "../../assets/projectLogoIcon.svg";

import { formatDate } from "../../utility/formatDate";
import { useEffect, useState } from "react";
import { getTask } from "../../services/task";
import { useParams } from "react-router-dom";
import { notify } from "../../utility/notify";
import Loader from "../../components/loader/Loader";

const ShareTask = () => {
  const [task, setTask] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { taskId } = useParams();
  console.log("tsssssssssssssssssssssssssssssssssssskkkkkkkkkkkkkkkkk", taskId);

  const jsDueDate = task?.dueDate && new Date(task?.dueDate);

  const fetchTask = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await getTask(taskId);
      setLoading(false);
      console.log("SSSSSShareeeee page", response);
      if (response?.status !== 200) {
        console.log("Err occured");
        setError(response?.data?.message);
        notify(response?.data?.message,"error");
        return;
      }
      setTask(response?.data?.data);
      notify(response?.data?.message);
    } catch (err) {
      setError(err?.response?.data?.message);
      notify(err?.response?.data?.message,"error");
      setLoading(false);
      console.log("IIIIIIII", err);
      console.log("ERRRRRRRRRnOOOOOOTTTTRRR");
    }
  };
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className={styles.shareTaskPage}>
      <header className={styles.header}>
        <img src={projectLogoIcon} alt="logo" className={styles.projectLogo} />
        <h1 className={styles.heading}>Pro Manage</h1>
      </header>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <main className={styles.main}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.dotWrapper}>
                    <p className={styles[task?.priority]}></p>
                    <span>{task?.priority?.toUpperCase()} PRIORITY</span>
                    {task?.assignTo && (
                      <div className={styles.avatar} title={task?.assignTo}>
                        {task?.assignTo?.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                <p className={styles.cardTitle}>{task?.title}</p>
                <div className={styles.checkListWrapper}>
                  <div className={styles.checkListHeading}>
                    Checklist ({task?.tickCount}/{task?.checkList?.length})
                  </div>
                </div>

                <div className={styles.optionsContainer}>
                  {task?.checkList?.map((option) => {
                    return (
                      <div
                        className={styles.singleOption}
                        key={option?.optionId}
                      >
                        <input
                          type="checkbox"
                          checked={option?.isTick}
                          readOnly
                          className={styles.checkInput}
                        />
                        <p className={styles.inputText}>{option?.checkText}</p>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.cardFooter}>
                  {jsDueDate && (
                    <>
                      <span>Due Date</span>
                      <p
                        className={`${styles.dueDate} ${styles.red} 
              `}
                      >
                        {formatDate(jsDueDate)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      )}
    </div>
  );
};

export default ShareTask;
