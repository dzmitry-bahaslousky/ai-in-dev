import { useState } from 'react';

interface Expense {
  category: string;
  amount: number;
}

export default function ExpenseCalculator() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const addExpense = () => {
    if (newCategory && newAmount) {
      const amount = parseFloat(newAmount.replace(/,/g, ''));
      if (!isNaN(amount)) {
        setExpenses([...expenses, { category: newCategory, amount }]);
        setNewCategory('');
        setNewAmount('');
      }
    }
  };

  const calculateTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculateAverageDaily = () => {
    return calculateTotal() / 30;
  };

  const getTopExpenses = () => {
    return [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  };

  return (
    <div className="container">
      <h1>Expense Calculator</h1>
      
      <div className="input-group">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="text"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          placeholder="Amount ($)"
        />
        <button onClick={addExpense}>
          Add Expense
        </button>
      </div>

      <div>
        <h2>Expenses List</h2>
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.category}</td>
                <td>{expense.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary">
        <h2>Summary</h2>
        <p>Total Expenses: ${calculateTotal().toLocaleString()}</p>
        <p>Average Daily Expense: ${calculateAverageDaily().toLocaleString()}</p>
        
        <h3>Top 3 Expenses:</h3>
        <ul>
          {getTopExpenses().map((expense, index) => (
            <li key={index}>
              {expense.category}: ${expense.amount.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 