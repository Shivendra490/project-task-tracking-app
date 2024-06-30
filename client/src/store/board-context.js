import React from "react";
const BoardContext = React.createContext({
  allTask: [],
  memberList: [],
  updateMemberList: () => {},
  replaceAllTask: () => {},
  addTask: () => {},
  removeTask: () => {},
  editTask: () => {},
});

export default BoardContext;
