var $        = require('jquery');
var Backbone = require('backbone');
var Store    = require('backbone.localstorage');
var Expense  = require('../models/expense');


Backbone.$ = $;

/*
 * Expenses collection
 */

 var Expenses = Backbone.Collection.extend({
     //Reference expense model.
     model: Expense,

     //local storage under namespace
     localStorage: new Store('expenses-tracker'),

     initialize: function()
     {
       console.log("Inits expenses");
     },

     // Todos are sorted by their original insertion order.
     comparator: 'order'
 });

 module.exports = Expenses;
