//const sayHello = require('./init');

require('../css/main.scss');

var ENTER_KEY = 13;
var ESC_KEY = 27;
var $        = require('jquery');
var AppView  = require('./views/app.view');
var Backbone = require('backbone');
Backbone.$ = $;

$(function () {
	// kick things off by creating the `App`
  Backbone.history.start();
	new AppView();
});
