const formatDate = (date) => {
    const day = date.getDate();
    const suffix = getOrdinalIndicator(day);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}${suffix} ${month}, ${year}`;
  };

  
  const getOrdinalIndicator = (day) => {
    if (day === 1 || day === 21 || day === 31) {
      return 'st';
    } else if (day === 2 || day === 22) {
      return 'nd';
    } else if (day === 3 || day === 23) {
      return 'rd';
    } else {
      return 'th';
    }
  };
  export {formatDate}