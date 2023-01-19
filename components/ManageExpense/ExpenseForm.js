import React, {useState} from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { GlobalStyles } from '../../constans/styles';

const ExpenseForm = ({onCancel, onSubmit, submitButtonHandler, defaultValues}) => {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date:{
            value: defaultValues? defaultValues.date.toISOString().slice(0, 10) : '',
            isValid: true,
        },
        description: {
            value: defaultValues? defaultValues.description : '',
            isValid: true,
        }

    });

    function inputChangeHandler(inputIdentifier, enteredValue){
        setInputs((currentInputs)=>{
            return {
                ...currentInputs,
                [inputIdentifier]:{value: enteredValue, isValid: true}
            }
        });
    };

    function submitHandler(){
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value.toString()
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() != 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;


        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((currentInputs)=>{
                return {
                    amount: {value: currentInputs.amount.value, isValid : amountIsValid},
                    date: {value: currentInputs.date.value, isValid: dateIsValid},
                    description: {value: currentInputs.description.value, isValid: descriptionIsValid}
                }
            })
            return;
        }
        onSubmit(expenseData);
    };

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input 
                    style={styles.rowInputStyle} 
                    label="Amount" 
                    invalid= {!inputs.amount.isValid}
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value,                    
                }}/>
                <Input 
                    style={styles.rowInputStyle}  
                    label="Date" 
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLenght: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value,                       
                }}/>
            </View>
            <Input 
                label="Description" 
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    // autoCorrect: false
                    autoCapitalize: 'words',
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value,  
            }}/>
            {formIsInvalid && <Text style={styles.errorText}>Invalid inputs values - please chceck your entered data!</Text>}
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonHandler}</Button>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    form:{
        marginTop: 20,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInputStyle:{
        flex: 1
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText:{
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    }
});


export default ExpenseForm