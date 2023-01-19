import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constans/styles';
import { ExpensesContex } from '../store/expenses-contex';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {deleteExpense, storeExpense, updateExpense} from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';



const ManageExpense = ({route, navigation}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const expenseCtx = useContext(ExpensesContex);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditing]);

    async function deleteExpenseHandler(){
        setIsSubmitting(true);
        expenseCtx.deleteExpense(editedExpenseId);
        setIsSubmitting(false);
        await deleteExpense(editedExpenseId);
        navigation.goBack();
    }
    function cancelHandler(){
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setIsSubmitting(true);
        if(isEditing){
            expenseCtx.updateExpense(editedExpenseId, expenseData);
            updateExpense(editedExpenseId, expenseData);
        }else{
            const id = await storeExpense(expenseData);
            expenseCtx.addExpense({...expenseData, id: id});
        }
        setIsSubmitting(false);
        navigation.goBack();
    }

    if(isSubmitting){
        return <LoadingOverlay/>
    }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                onCancel={cancelHandler} 
                submitButtonHandler={isEditing ? 'Update' : 'Add'} 
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                    icon="trash" 
                    color={GlobalStyles.colors.error500} 
                    size={36} 
                    onPress={deleteExpenseHandler} 
                    />
                </View>
            )
}
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }, 
})

export default ManageExpense