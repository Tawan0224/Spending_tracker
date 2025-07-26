const STORAGE_KEY = 'spending-data';

export const getSpending = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const addSpending = (record) => {
  const data = getSpending();
  data.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
