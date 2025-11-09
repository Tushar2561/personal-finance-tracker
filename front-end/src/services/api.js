// front-end/src/services/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8081/api/expenses"; // <- use 127.0.0.1 to avoid localhost/IPv6 mismatch

export const getExpenses = async (startDate, endDate) => {
  const response = await axios.get(API_URL, { params: { startDate, endDate } });
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await axios.post(API_URL, expense);
  return response.data;
};

export const updateExpense = async (id, updatedExpense) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedExpense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
