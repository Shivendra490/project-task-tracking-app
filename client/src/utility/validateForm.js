const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegisterForm = (user) => {
  const errObj = {};
  if (user?.userName?.trim().length < 4) {
    errObj.userName = "Name should be atleast 4 char long";
  }
  if (user?.userName?.trim() === "") {
    errObj.userName = "Name is required";
  }

  const isValid = emailRegex.test(user?.email);
  if (!isValid) {
    errObj.email = "Enter valid email";
  }

  if (user?.email?.trim() === "") {
    errObj.email = "Email is required";
  }

  if (user?.confirmPassword === "" || user?.confirmPassword?.length < 4) {
    errObj.confirmPassword = "confirm password is required of atleast 4 char";
  }
  if (user?.password === "" || user?.password?.length < 4) {
    errObj.password = "Password is required of atleast 4 char";
  }
  if (user?.password !== user?.confirmPassword) {
    errObj.confirmPassword = "Password and confirm Password mismatch";
    errObj.password = "Password and confirm Password mismatch";
  }

  if (Object.keys(errObj).length !== 0) {
    console.log("OOOObject", Object.keys(errObj).length);
    return errObj;
  } else {
    return null;
  }
};

const validateLoginForm = (user) => {
  const errObj = {};

  const isValid = emailRegex.test(user?.email);
  if (!isValid) {
    errObj.email = "Enter valid email";
  }
  if (user?.email?.trim() === "") {
    errObj.email = "Email is required";
  }

  if (user?.password === "") {
    errObj.password = "Password is required";
  }

  if (Object.keys(errObj).length !== 0) {
    console.log("OOOObject", Object.keys(errObj).length);
    return errObj;
  } else {
    return null;
  }
};

const validateTaskForm = (task) => {
  const errObj = {};

  if (task?.title?.trim() === "") {
    errObj.title = "Title is required";
  }

  if (task?.priority === "") {
    errObj.priority = "Select Priority";
  }

  if (
    task?.checkList?.length === 0 ||
    task?.checkList?.some((option) => {
      return option?.checkText?.trim() === "";
    })
  ) {
    errObj.checkList = "Atleast 1 checklist required";
  }

  if (Object.keys(errObj).length !== 0) {
    console.log("OOOObject", Object.keys(errObj).length);
    return errObj;
  } else {
    return null;
  }
};

const validateAddMemberForm = (email) => {
  let isErr = "";
  const isValid = emailRegex.test(email);
  if (!isValid) {
    isErr = "Enter valid email";
  }
  if (email?.trim() === "") {
    isErr = "Email is required";
  }

  return isErr;
};



const validateSettingForm = (user) => {
  const errObj = {};
  if (user?.userName?.trim().length < 4) {
    errObj.userName = "Name should be atleast 4 char long";
  }
  if (user?.userName?.trim() === "") {
    errObj.userName = "Name is required";
  }

  const isValid = emailRegex.test(user?.email);
  if (!isValid) {
    errObj.email = "Enter valid email";
  }

  if (user?.email?.trim() === "") {
    errObj.email = "Email is required";
  }

  if (user?.oldPassword?.trim() && user?.oldPassword?.length < 4) {
    errObj.oldPassword = "Old Password is of atleast 4 char long";
  }
  if (user?.newPassword?.trim() && user?.newPassword?.length < 4) {
    errObj.newPassword = "New Password is of atleast 4 char long";
  }
 

  if (Object.keys(errObj).length !== 0) {
    console.log("OOOObject", Object.keys(errObj).length);
    return errObj;
  } else {
    return null;
  }
};

export {
  validateRegisterForm,
  validateLoginForm,
  validateTaskForm,
  validateAddMemberForm,
  validateSettingForm
};
