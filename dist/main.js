
const expenseManager = new ExpenseManager()
const render = new Renderer()

const run = async function(){
    await expenseManager.getExpenses()
    console.log(expenseManager.expenses)
    render.renderExpenses(expenseManager.expenses)
}

run()



