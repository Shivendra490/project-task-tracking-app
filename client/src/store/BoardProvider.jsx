import { useReducer } from "react";
import BoardContext from "./board-context";
import { ADD_TASK, REMOVE_TASK, REPLACE_ALL_TASK, UPDATE_TASK } from "../constant";
import PropTypes from "prop-types";

const defaultBoardState = {
  allTaskList: []
};

const boardReducer = (state, action) => {
  if (action.type === REPLACE_ALL_TASK) {
   //
   return {allTaskList:action.payload} 
  }
  if (action.type === ADD_TASK) {
    //
    const updatedAllTaskList=[...state.allTaskList,action.payload]
    return {allTaskList:updatedAllTaskList}
  }
  if (action.type === REMOVE_TASK) {
    const updatedAllTaskList=state.allTaskList.filter((task)=>task._id.toString()!==action.payload.toString())
    return {allTaskList:updatedAllTaskList}
    //
  }
  if (action.type === UPDATE_TASK) {
    //
  }
 

  return defaultBoardState;
};

const BoardProvider = (props) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    defaultBoardState
  );

  const replaceAll = (taskList) => {
    dispatchBoardAction({ type: REPLACE_ALL_TASK, payload: taskList });
  };

  const addSingleTask=(task)=>{
    dispatchBoardAction({type:ADD_TASK,payload:task})
  }

  const removeSingleTask = (taskId) => {
    dispatchBoardAction({type:REMOVE_TASK,payload:taskId})
  };

  const updateStatus = () => {};

 

  const boardContext = {
   
    allTask:boardState.allTaskList,
    replaceAllTask: replaceAll,
    addTask:addSingleTask,
    removeTask: removeSingleTask,
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
