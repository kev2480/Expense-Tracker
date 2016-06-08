var $           = require('jquery');
var Backbone    = require('backbone');
var Expenses    = require('../collections/expenses');
var ExpenseView = require('./expense.view');
var _           = require('underscore');

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
     //On reset
     this.listenTo(expensesCollection, 'reset', this.addAll);
     //On something being deleted
     this.listenTo(expensesCollection, 'remove', this.addAll);
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
    expensesCollection.create({
      title:     this.$newExpenseTitle.val(),
      amount:    this.$newExpenseAmount.val(),
      isMonthly: this.$monthRadio.is(':checked')
    });
    this.$newExpenseTitle.val("");
    this.$newExpenseAmount.val("");
  },


});

module.exports = AppView;
