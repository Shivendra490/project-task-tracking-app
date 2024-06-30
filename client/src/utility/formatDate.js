

const getOrdinalIndicator = (day) => {
  if (day === 1 || day === 21 || day === 31) {
    return "st";
  } else if (day === 2 || day === 22) {
    return "nd";
  } else if (day === 3 || day === 23) {
    return "rd";
  } else {
    return "th";
  }
};

const formatDate = (date, length="short") => {
  const day = date.getDate();
  const suffix = getOrdinalIndicator(day);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  if (length === "full") {
    return `${day}${suffix} ${month}, ${year}`;
  } else {
    return `${month} ${day}${suffix}`;
  }
};

const dueDatePassed = (jsDueDate) => {
  const currentDate = new Date();
  if (currentDate <= jsDueDate) {
    return false;
  } else {
    return true;
  }

};
export { formatDate, dueDatePassed };
