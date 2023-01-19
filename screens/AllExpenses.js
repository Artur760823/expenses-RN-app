import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput';
import { ExpensesContex } from '../store/expenses-contex';

const AllExpenses = () => {
  const expenseCtx = useContext(ExpensesContex);
  return (
    <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod="Total" fallbackText="No registered expenses found!"/>
  )
}

export default AllExpenses