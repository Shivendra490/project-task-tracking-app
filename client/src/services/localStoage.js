export const storeUserInfo = (token, userId, email) => {
    if (!token || !userId || !email) {
      return;
    }
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userId", JSON.stringify(userId));
    localStorage.setItem("email", JSON.stringify(email));
    return { token, email, userId };
  };
  
  export const getUserInfo = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const userId = JSON.parse(localStorage.getItem("userId"));
    const email = JSON.parse(localStorage.getItem("email"));
    return { token, email, userId };
  };
  
  export const removeUserInfo = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    
  };
  