class Renderer{
    constructor(){
    }

    renderExpenses = function(expenses){
        const source = $('#store-template-expenses').html();
        const template = Handlebars.compile(source);
        const newHTML = template({expenses});
        $('.expenses').empty().append(newHTML);
    }

    
    renderAdd = function(expensesToAdd){
        const source = $('#store-template-expensesToAdd').html();
        const template = Handlebars.compile(source);
        const newHTML = template({expensesToAdd});
        $('.expenses').empty().append(newHTML);
    }
}


