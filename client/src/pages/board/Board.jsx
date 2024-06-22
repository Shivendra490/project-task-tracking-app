import styles from "./Board.module.css";
import collapseIcon from "../../assets/collapseIcon.svg";
import menuIcon from "../../assets/menuIcon.svg";
import arrDown from "../../assets/arrDown.svg";

const Board = () => {
  return (
    <main className={styles.boardPage}>
      <div className={styles.nameDateWrapper}>
        <h2 className={styles.name}>Welcome! Username</h2>
        <div className={styles.date}>12 Jan,2024</div>
      </div>
      <div className={styles.headingFilterWrapper}>
        <h1 className={styles.heading}>Board</h1>
        <select className={styles.filter}>
          <option value="week">This Week</option>
          <option value="today">Today</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <div className={styles.allStatusContainer}>
        <div className={styles.singleStatusContainer}>
          <div className={styles.statusIconWrapper}>
            <div className={styles.statusHeading}>Backlog</div>
            <div>
              <img src={collapseIcon} alt="collapse icon" />
            </div>
          </div>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.dotWrapper}>
                  <p className={styles.greenDot}></p>
                  <span>HIGH PRIORITY</span>
                </div>
                {/* <div className={styles.dotIconWrapper}>
                  <img src={menuIcon} alt="doticon" />
                  <div className={styles.menuPopup}>
                    <div className={styles.popupText}>Edit</div>
                    <div className={styles.popupText}>Share</div>
                    <div className={styles.deletePopupText}>Delete</div>
                  </div>
                </div> */}
              </div>
              <p className={styles.cardTitle}>Hero Section</p>
              <div className={styles.checkListWrapper}>
                <div className={styles.checkListHeading}>Checklist (0/3)</div>
                <img src={arrDown} alt="Down arr" />
              </div>
              <div className={styles.optionsContainer}>
                <div className={styles.singleOption}>
                  <input type="checkbox" className={styles.checkInput} />
                  <input type="text" className={styles.input} />
                </div>
                <div className={styles.singleOption}>
                  <input type="checkbox" className={styles.checkInput} />
                  <input type="text" className={styles.input} />
                </div>
                <div className={styles.singleOption}>
                  <input type="checkbox" className={styles.checkInput} />
                  <input type="text" className={styles.input} />
                </div>
              </div>
              <div className={styles.cardFooter}>
                <p className={styles.dueDate}>Feb10th</p>
                <div className={styles.actionBtnWrapper}>
                  <button className={styles.actionBtn}>PROGRESS</button>{" "}
                  <button className={styles.actionBtn}>TO-DO</button>
                  <button className={styles.actionBtn}>DONE</button>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.dotWrapper}>
                  <p className={styles.greenDot}></p>
                  <span>HIGH PRIORITY</span>
                </div>
                {/* <div className={styles.dotIconWrapper}>
                  <img src={menuIcon} alt="doticon" />
                  <div className={styles.menuPopup}>
                    <div className={styles.popupText}>Edit</div>
                    <div className={styles.popupText}>Share</div>
                    <div className={styles.deletePopupText}>Delete</div>
                  </div>
                </div> */}
              </div>
              <p className={styles.cardTitle}>Hero Section</p>
              <div className={styles.checkListWrapper}>
                <div className={styles.checkListHeading}>Checklist (0/3)</div>
                <img src={arrDown} alt="Down arr" />
              </div>
              <div className={styles.optionsContainer}>
                <div className={styles.singleOption}>
                  <input type="checkbox" className={styles.checkInput} />
                  <input type="text" className={styles.input} />
                </div>
                <div className={styles.singleOption}>
                  <input type="checkbox" className={styles.checkInput} />
                  <input type="text" className={styles.input} />
                </div>
                <div className={styles.singleOption}>
                  <input type="checkbox" className={styles.checkInput} />
                  <input type="text" className={styles.input} />
                </div>
              </div>
              <div className={styles.cardFooter}>
                <p className={styles.dueDate}>Feb10th</p>
                <div className={styles.actionBtnWrapper}>
                  <button className={styles.actionBtn}>PROGRESS</button>{" "}
                  <button className={styles.actionBtn}>TO-DO</button>
                  <button className={styles.actionBtn}>DONE</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.singleStatusContainer}>
          <div className={styles.statusIconWrapper}>
            <div className={styles.statusHeading}>Backlog</div>
            <div>
              <img src={collapseIcon} alt="collapse icon" />
            </div>
          </div>
          <div className={styles.cardsContainer}>Card</div>
        </div>

        <div className={styles.singleStatusContainer}>
          <div className={styles.statusIconWrapper}>
            <div className={styles.statusHeading}>Backlog</div>
            <div>
              <img src={collapseIcon} alt="collapse icon" />
            </div>
          </div>
          <div className={styles.cardsContainer}>Card</div>
        </div>

        <div className={styles.singleStatusContainer}>
          <div className={styles.statusIconWrapper}>
            <div className={styles.statusHeading}>Backlog</div>
            <div>
              <img src={collapseIcon} alt="collapse icon" />
            </div>
          </div>
          <div className={styles.cardsContainer}>Card</div>
        </div>
      </div>
    </main>
  );
};

export default Board;
