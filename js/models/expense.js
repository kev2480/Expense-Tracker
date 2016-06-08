var $        = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;

/*
 * Expense model.
 */

var Expense = Backbone.Model.extend({
		// Default attributes for the expense
		defaults: {
			title: 'Expense default',
			amount: 1.50,
			isMonthly: true,
		},
});

module.exports = Expense;
