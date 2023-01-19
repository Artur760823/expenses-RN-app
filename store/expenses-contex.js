import { createContext, useReducer } from "react";


export const ExpensesContex = createContext({
    expenses: [],
    addExpense: ({description, amount, date})=>{},
    setExpenses: (expenses)=>{},
    deleteExpense: (id)=>{},
    updateExpense: (id, {description, amount, date})=>{},
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            return [ action.payload,...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableExpensesIndex = state.findIndex((expense)=> expense.id === action.payload.id);
            const upadatebleExpense = state[updatableExpensesIndex];
            const updatedItem = {...upadatebleExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpensesIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContexProvider({children}){

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    };

    function setExpenses(expenses){
        dispatch({type: 'SET', payload: expenses});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id})
    };

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
    };

    const value = {
        expenses: expensesState, 
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return(
        <ExpensesContex.Provider value={value} >{children}</ExpensesContex.Provider>
    )
};

export default ExpensesContexProvider;