// Updated spendingService.js
const STORAGE_KEY = 'spendingData'; // Same key as the hook

export const getSpending = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  console.log('Getting spending data:', data);
  return data;
};

export const addSpending = (record) => {
  const data = getSpending();
  data.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  console.log('Added spending record:', record);
};

export const updateSpending = (updatedData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  console.log('Updated spending data:', updatedData);
};