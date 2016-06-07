var $        = require('jquery');
var Backbone = require('backbone');
var _        = require('underscore');
var expenseTemplate = require('../templates/expense.handlebars');

/*
 * Expense View
 */

var ExpenseView = Backbone.View.extend( {
  //Tag
  tagName:  'li',

  //Template
  template: expenseTemplate,

  //Events we want to add
  events: {
    'click .destroy':	'clear',
  },

  //Initialise
  initialize: function () {
    //Listen to any changes and re render.
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },

  clear: function () {
    this.model.destroy();
  }

});

module.exports = ExpenseView;
