const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const moment = require('moment');

mongoose.connect('mongodb://localhost/expensesDB', { useNewUrlParser: true })

// const jsonFile = require('../../expenses.json')
// jsonFile.forEach(jf => new Expense({name: jf.name, amount: jf.amount, date: jf.date, group: jf.group}).save())



router.get('/expenses', function (req, res) {
    const d1 = req.query.d1
    const d2 = req.query.d2
    if(!d1 && !d2){
        Expense.find({},null, {sort: {date: -1}}, function (err, expenses) {
            res.send(expenses)
        })
    }
    else{
        const date1 = moment(d1).format("LLLL");
        const date2 = d2 ? moment(d2).format("LLLL") : moment(new Date()).format("LLLL")
        Expense.aggregate([
            {
                $match: {
                    date: { $gte: new Date(date1), $lt: new Date(date2) }
                }
            }], function(err, results){
                res.send(results)
        }).sort({date: 1})
    }
})

router.post('/expense', function(req, res){
    const expense = req.body;
    const newExpense = new Expense({name: expense.name, amount: expense.amount, group: expense.group})
    const date = expense.date ? moment(expense.date).format("LLLL") : moment(new Date()).format("LLLL")
    newExpense.date = date
    newExpense.save().then(console.log(`Amount of expense: ${newExpense.amount} spent on ${newExpense.name}`));
    res.send(newExpense)
})

router.put('/update/:group1/:group2', function(req, res){
    const group1 = req.params.group1
    const group2 = req.params.group2;
    Expense.findOneAndUpdate({group: group1}, {group: group2}, function(err, expense){
        res.send(`name of the expense: ${expense.name}, and the new group: ${expense.group}`);
    })
})

router.get('/expenses/:group', function (req, res) {
    const group = req.params.group
    const total = req.query.total
    if(total == 'true')
    {
        Expense.aggregate([
            {
                $group:
                {
                    _id: "$group",
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { totalAmount: -1 } }], function(err, results){
                res.send(results)
        })
    }
    else{
        res.end()
    }
})



module.exports = router