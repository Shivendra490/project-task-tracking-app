import styles from "./Analytics.module.css";

const initialInfoList = [
  { label: "Backlog Tasks", count: 0 },
  { label: "To-do Tasks", count: 0 },
  { label: "In-Progess Tasks", count: 0 },
  { label: "Completed Tasks", count: 0 },
  { label: "Low Priority", count: 0 },
  { label: "Moderate Priority", count: 0 },
  { label: "High Priority", count: 0 },
  { label: "Due Date Tasks", count: 0 },
];

const Analytics = () => {
  return (
    <div className={styles.analyticsPage}>
      <h1 className={styles.heading}>Analytics</h1>
      <section className={styles.infoSection}>
        <ul className={styles.ulContainer}>
          {initialInfoList?.slice(0,4).map((info,index) => {
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
          {initialInfoList?.slice(4).map((info,index) => {
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
    </div>
  );
};

export default Analytics;
