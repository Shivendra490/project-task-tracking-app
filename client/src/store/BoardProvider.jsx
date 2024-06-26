import { useReducer } from "react";
import BoardContext from "./board-context";
import { ADD_COMBINE, ADD_TASK, REMOVE_TASK, UPDATE_TASK } from "../constant";

const defaultBoardState = {
  allTaskList: [],
  todoList: [],
  backlogList: [],
  progressList: [],
  doneList: [],
};

const boardReducer = (state, action) => {
  if (action.type === ADD_TASK) {
    console.log("payload", action.payload);
    const updatedTodoTasks = [...state.todoList, action.payload];
    console.log("updatedTodoTask", updatedTodoTasks);
    console.log("state", { ...state, todoList: updatedTodoTasks });
    return { ...state, todoList: updatedTodoTasks };
  }
  if (action.type === REMOVE_TASK) {
    //
  }
  if (action.type === UPDATE_TASK) {
    //
  }
  if (action.type === ADD_COMBINE) {
    const updatedTodoTask = action?.payload?.filter(
      (task) => task.status === "todo"
    );
    const updatedBacklogTask = action?.payload?.filter(
      (task) => task.status === "backlog"
    );
    const updatedProgressTask = action?.payload?.filter(
      (task) => task.status === "progress"
    );
    const updatedDoneTask = action?.payload?.filter(
      (task) => task.status === "done"
    );
    return {
      ...state,
      allTaskList: action.payload,
      todoList: updatedTodoTask,
      backlogList: updatedBacklogTask,
      progressList: updatedProgressTask,
      doneList: updatedDoneTask,
    };
  }

  return defaultBoardState;
};

const BoardProvider = (props) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    defaultBoardState
  );

  const addTaskToBoard = (task) => {
    console.log("33 task", task);
    dispatchBoardAction({ type: ADD_TASK, payload: task });
  };

  const removeTaskFromBoard = () => {};

  const updateStatus = () => {};

  const addTaskToCombinedList = (combinedTasks) => {
    dispatchBoardAction({ type: ADD_COMBINE, payload: combinedTasks });
  };

  const boardContext = {
    allTasks: boardState.allTaskList,
    todoTasks: boardState.todoList,
    backlogTasks: boardState.backlogList,
    progressTasks: boardState.progressList,
    doneTasks: boardState.doneList,
    addTocombinedTasks: addTaskToCombinedList,
    addTask: addTaskToBoard,
    removeTask: removeTaskFromBoard,
    updateTaskStatus: updateStatus,
  };
  return (
    <BoardContext.Provider value={boardContext}>
      {props.children}
    </BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
 
  children: PropTypes.element,
 
};

export default BoardProvider;
