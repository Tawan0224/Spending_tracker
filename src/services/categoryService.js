const CATEGORY_KEY = 'custom-categories';

export const getCategories = async () => {
  const defaultRes = await fetch('/spending-category.json');
  const defaultCategories = await defaultRes.json();
  const custom = JSON.parse(localStorage.getItem(CATEGORY_KEY)) || [];
  return [...defaultCategories, ...custom];
};

export const addCategory = (name) => {
  const custom = JSON.parse(localStorage.getItem(CATEGORY_KEY)) || [];
  custom.push(name);
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(custom));
};
