var $           = require('jquery');
var Backbone    = require('backbone');
var Expenses    = require('../collections/expenses');
var ExpenseView = require('./expense.view');
var _           = require('underscore');
import PieChart from '../PieChart';

var expensesCollection = new Expenses();
Backbone.$ = $;

var AppView = Backbone.View.extend( {

  //Bind to element
  el: '#app',

  //Any events we want go here.
  events: {
    'submit form':		'createOnSubmit',
  },

  initialize: function() {
    /*In here we're going to need to bind events on the Expenses collection.
     * When we want to add or change an item.
     * We will need to load any preexisting Expenses saved in *localStorage"
     */
     //Elements
     this.$expenseList      = this.$('#expense-list');
     this.$newExpenseForm   = this.$('#new-expense');
     this.$newExpenseTitle  = this.$('#name');
     this.$newExpenseAmount = this.$('#cost');
     this.$monthRadio       = this.$('#monthly');


     //Listening
     //On an add
     this.listenTo(expensesCollection, 'add', this.addOne);
     this.listenTo(expensesCollection, 'add', this.buildChart);
     //On reset
     this.listenTo(expensesCollection, 'reset', this.addAll);
     this.listenTo(expensesCollection, 'reset', this.buildChart);
     //On something being deleted
     this.listenTo(expensesCollection, 'remove', this.addAll);
     this.listenTo(expensesCollection, 'remove', this.buildChart);
     //All
     this.listenTo(expensesCollection, 'all', _.debounce(this.render, 0));

     expensesCollection.fetch({reset: true});

     /*expensesCollection.each(function (expense) {
       console.log(expense.get('amount'));
     });*/
  },

  render: function () {

  },

  //Add one
  addOne: function(expense) {
    console.log("addOne called");
    var view = new ExpenseView({ model: expense });

    //Render.
    var element = view.render().el;

    element.className += " list-group-item";

    /** To Animate - Needs fixing

    element.className += " list-group-item list-group-hidden";
    this.$('#expense-list div:last-child').removeClass("list-group-hidden").addClass("pullDown");*/

    //Render.
    this.$expenseList.append(element);
  },

  //Add all
  addAll: function() {
    console.log("addAll called");
    this.$expenseList.empty();

    expensesCollection.each(this.addOne, this);
  },

  //Create new expense
  createOnSubmit: function(e) {
    e.preventDefault();
    var perMonth;
    if ( this.$monthRadio.is(':checked') )
    {
        perMonth = this.$newExpenseAmount.val()
    } else {
        perMonth = this.$newExpenseAmount.val() / 12;
    }

    expensesCollection.create({
      title:          this.$newExpenseTitle.val(),
      amount:         this.$newExpenseAmount.val(),
      amountPerMonth: perMonth,
      isMonthly:      this.$monthRadio.is(':checked'),
      color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    });
    this.$newExpenseTitle.val("");
    this.$newExpenseAmount.val("");
  },

  buildChart: function(){
    console.log("building chart");
    //var pie = require('../PieChart');
    if ( typeof  this.pieChart !== 'undefined') {
      //Pie chart already exists. update
      //this.pieChart.updatePie(expensesCollection);
      this.pieChart.destroyPie();
    } else {

    }
    this.pieChart = new PieChart($("#chart"), expensesCollection);

  }
});

module.exports = AppView;
