import React, { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput';
import { ExpensesContex } from '../store/expenses-contex';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expenseCtx = useContext(ExpensesContex);

  useEffect(()=>{
    async function getExpenses(){
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses')
      }
      setIsFetching(false);  
    }
    getExpenses();
    
  }, []);

  function errorHandler(){
    setError(null);
  }

  if(isFetching){
   return <LoadingOverlay/>
  }
  if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }


  const recentExpenses = expenseCtx.expenses.filter((expense)=> {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="No expenses registered for the last seven days!"/>
  )
}

export default RecentExpenses