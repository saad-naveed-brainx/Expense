import { CATEGORY_STYLES } from './constants';

export const formatAmount = (value) => {
  return `$ ${Number(value || 0).toFixed(2)}`;
};

export const getCategoryBadgeClasses = (category) => {
  const lowerCategory = (category || '').toLowerCase();
  return CATEGORY_STYLES[lowerCategory] || CATEGORY_STYLES.default;
};

export const getRecentExpenses = (expenses, days = 3) => {
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - days);
  
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= daysAgo;
  });
};

export const calculateTotals = (expenses) => {
  let totalBalance = 0;
  let totalExpenses = 0;
  let totalIncome = 0;

  expenses.forEach((expense) => {
    if (expense.type === "expense") {
      totalBalance -= expense.amount;
      totalExpenses += expense.amount;
    } else {
      totalBalance += expense.amount;
      totalIncome += expense.amount;
    }
  });

  return { totalBalance, totalExpenses, totalIncome };
};

export const prepareCsvData = (expenses) => {
  return expenses.map(exp => ({
    title: exp?.title || '',
    category: exp?.category || '',
    date: exp?.date || '',
    amount: exp?.amount || 0,
    type: exp?.type || '',
    description: exp?.description || '',
    reimbersable: exp?.reimbersable || false,
    createdAt: exp?.createdAt || '',
  }));
};
