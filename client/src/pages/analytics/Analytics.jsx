import { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { fetchTaskStatusCounts } from "../../services/task";
import { notify } from "../../utility/notify";
import Loader from "../../components/loader/Loader";

const initialInfoList = [
  { label: "Backlog Tasks", info: "backlog", count: 0 },
  { label: "To-do Tasks", info: "todo", count: 0 },
  { label: "In-Progess Tasks", info: "progress", count: 0 },
  { label: "Completed Tasks", info: "done", count: 0 },
  { label: "Low Priority", info: "low", count: 0 },
  { label: "Moderate Priority", info: "moderate", count: 0 },
  { label: "High Priority", info: "high", count: 0 },
  { label: "Due Date Tasks", info: "dueDate", count: 0 },
];

const Analytics = () => {
  const [infoList, setInfoList] = useState(initialInfoList);
  const [loading, setLoading] = useState(false);
  console.log(setInfoList);
  const fetchTaskInfo = async () => {
    try {
      setLoading(true);
      const response = await fetchTaskStatusCounts();
      setLoading(false);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaarryyyy", response);
      if (response?.status !== 200) {
        notify(response?.data?.message,"error");

        return;
      }

      const countObj = response?.data?.taskCountsObj;
      const countArr = initialInfoList.map((curObj) => {
        return { ...curObj, count: countObj[curObj.info] };
      });
      setInfoList(countArr);
    } catch (err) {
      notify(err?.response?.data?.message,"error");
      setLoading(false);
      console.log("analytics catch", err);
    }
  };
  useEffect(() => {
    fetchTaskInfo();
  }, []);
  return (
    <div className={styles.analyticsPage}>
      <h1 className={styles.heading}>Analytics</h1>
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.infoSection}>
          <ul className={styles.ulContainer}>
            {infoList?.slice(0, 4).map((info, index) => {
              return (
                <div className={styles.detailField} key={index}>
                  <div className={styles.dotLabelWrapper}>
                    <div className={styles.dot}></div>
                    <p className={styles.label}>{info?.label}</p>
                  </div>
                  <span className={styles.count}>{info?.count}</span>
                </div>
              );
            })}
          </ul>

          <ul className={styles.ulContainer}>
            {infoList?.slice(4).map((info, index) => {
              return (
                <div className={styles.detailField} key={index}>
                  <div className={styles.dotLabelWrapper}>
                    <div className={styles.dot}></div>
                    <p className={styles.label}>{info?.label}</p>
                  </div>
                  <span className={styles.count}>{info?.count}</span>
                </div>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Analytics;
