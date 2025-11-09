import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateExpense, deleteExpense } from "../services/api";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, onExpenseUpdated, onExpenseDeleted }) => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ description: "", amount: "", date: "" });

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setForm({
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ description: "", amount: "", date: "" });
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        description: form.description,
        amount: Number(form.amount),
        date: form.date,
      };
      await updateExpense(id, payload);
      setEditingId(null);
      onExpenseUpdated(); // refresh list after update
    } catch (err) {
      console.error("Error updating expense:", err);
      alert("Failed to update expense");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await deleteExpense(id);
      onExpenseDeleted(); // refresh list after delete
    } catch (err) {
      console.error("Error deleting expense:", err);
      alert("Failed to delete expense");
    }
  };

  if (!expenses || expenses.length === 0) {
    return <p>No expenses to display.</p>;
  }

  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              {editingId === exp.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(e) =>
                        setForm({ ...form, amount: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(exp.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{exp.description}</td>
                  <td>₹{exp.amount}</td>
                  <td>{exp.date}</td>
                  <td>
                    <button onClick={() => startEdit(exp)}>Edit</button>
                    <button onClick={() => handleDelete(exp.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
  onExpenseUpdated: PropTypes.func.isRequired,
  onExpenseDeleted: PropTypes.func.isRequired,
};

export default ExpenseList;
