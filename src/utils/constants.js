export const TRANSACTION_TYPES = {
  EXPENSE: 'expense',
  INCOME: 'income'
};

export const EXPENSE_CATEGORIES = {
  FOOD: 'food',
  TRANSPORT: 'transport',
  HOUSING: 'housing',
  UTILITIES: 'utilities'
};


// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://expense-tracking-backend.brainxdemo.com/api/v1';


export const INCOME_CATEGORIES = {
  SALARY: 'salary',
  INVESTMENT: 'investment',
  OTHER: 'other'
};

export const EXPENSE_CATEGORY_OPTIONS = [
  { value: EXPENSE_CATEGORIES.FOOD, label: 'Food' },
  { value: EXPENSE_CATEGORIES.TRANSPORT, label: 'Transport' },
  { value: EXPENSE_CATEGORIES.HOUSING, label: 'Housing' },
  { value: EXPENSE_CATEGORIES.UTILITIES, label: 'Utilities' }
];

export const INCOME_CATEGORY_OPTIONS = [
  { value: INCOME_CATEGORIES.SALARY, label: 'Salary' },
  { value: INCOME_CATEGORIES.INVESTMENT, label: 'Investment' },
  { value: INCOME_CATEGORIES.OTHER, label: 'Other' }
];

export const CATEGORY_OPTIONS = EXPENSE_CATEGORY_OPTIONS;

export const TYPE_OPTIONS = [
  { value: TRANSACTION_TYPES.EXPENSE, label: 'Expense' },
  { value: TRANSACTION_TYPES.INCOME, label: 'Income' }
];

export const VALIDATION_REGEX = {
  TITLE: /^[A-Za-z]+(?: [A-Za-z]+)*$/
};

export const VALIDATION_MESSAGES = {
  TITLE_REQUIRED: 'Title is required',
  TITLE_MIN_LENGTH: 'Title must be at least 3 characters long',
  TITLE_PATTERN: 'Title must contain only letters',
  AMOUNT_REQUIRED: 'Amount is required',
  AMOUNT_MIN: 'Amount must be greater than 0',
  DATE_REQUIRED: 'Date is required',
  DATE_FUTURE: 'Date must not be in future',
  CATEGORY_REQUIRED: 'Category must be selected',
  TYPE_REQUIRED: 'Type is required',
  DESCRIPTION_REQUIRED: 'Description is required'
};

export const CATEGORY_STYLES = {
  [EXPENSE_CATEGORIES.FOOD]: 'bg-indigo-900/40 text-indigo-300',
  [EXPENSE_CATEGORIES.TRANSPORT]: 'bg-rose-900/40 text-rose-300',
  [EXPENSE_CATEGORIES.HOUSING]: 'bg-fuchsia-900/40 text-fuchsia-300',
  [EXPENSE_CATEGORIES.UTILITIES]: 'bg-teal-900/40 text-teal-300',
  default: 'bg-gray-800 text-gray-300'
};

export const CSV_HEADERS = [
  { label: "Title", key: "title" },
  { label: "Category", key: "category" },
  { label: "Date", key: "date" },
  { label: "Amount", key: "amount" },
  { label: "Type", key: "type" },
  { label: "Description", key: "description" },
  { label: "Reimbersable", key: "reimbersable" },
  { label: "CreatedAt", key: "createdAt" }
];

export const CHART_COLORS = {
  EXPENSE: 'red',
  INCOME: 'green'
};

export const CHART_LABELS = [TRANSACTION_TYPES.EXPENSE, TRANSACTION_TYPES.INCOME];

export const RECENT_DAYS_FILTER = 3;
