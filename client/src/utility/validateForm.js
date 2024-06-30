const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegisterForm = (user) => {
  const errObj = {};
  if (user?.userName?.trim() === "") {
    errObj.userName = "Name is required";
  }
  if (user?.email?.trim() === "") {
    errObj.email = "Email is required";
  }
  const isValid = emailRegex.test(user?.email);
  if (!isValid) {
    errObj.email = "Enter valid email";
  }
  if (user?.confirmPassword === "" || user?.confirmPassword?.length < 4) {
    errObj.confirmPassword = "Password is required of atleast 4 char";
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

  if (user?.email?.trim() === "") {
    errObj.email = "Email is required";
  }
  const isValid = emailRegex.test(user?.email);
  if (!isValid) {
    errObj.email = "Enter valid email";
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

export { validateRegisterForm, validateLoginForm, validateTaskForm };
