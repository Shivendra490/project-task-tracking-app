export const storeUserInfo = (token, userId, email, userName) => {
  if (!token || !userId || !email) {
    return;
  }
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("userId", JSON.stringify(userId));
  localStorage.setItem("email", JSON.stringify(email));
  localStorage.setItem("userName", JSON.stringify(userName));
  return { token, email, userId, userName };
};

export const getUserInfo = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const email = JSON.parse(localStorage.getItem("email"));
  const userName = JSON.parse(localStorage.getItem("userName"));
  return { token, email, userId, userName };
};

export const removeUserInfo = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("userName");
};
