class ExpenseManager {
    constructor(){
        this.expenses = []
    }

    addExpense = function(){
        $.post('/expense', response => {
            this.expenses.push(response)
        })
       
    }

    getExpenses = async function(){
        await $.get(`/expenses`, response => {
            this.expenses = response
        })
    }  
    
   
}



    

