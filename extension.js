const Main = imports.ui.main;
const WindowAttentionHandler = imports.ui.windowAttentionHandler;
const Lang = imports.lang;

function bringToFront() {
	this._init();
}

function removeNotification() {
	this._init();
}
//-----------------------------------------------------------------------------
bringToFront.prototype = {
	_init : function() {
		this._handlerid = global.display.connect('window-demands-attention', Lang.bind(this, this._onWindowDemandsAttention));
	},

	_onWindowDemandsAttention: function(display, window) {
		Main.activateWindow(window);
	},

	destroy: function () {
		global.display.disconnect(this._handlerid);
	}
}
//-----------------------------------------------------------------------------
removeNotification.prototype = {
	_init : function() {
		global.display.disconnect(Main.windowAttentionHandler._windowDemandsAttentionId);
	},

	destroy: function () {
		global.display.disconnect(this._handlerid);
	}
}
//-----------------------------------------------------------------------------
let removeNotification;
let bringToFront;

function init() {}

//gnome-extensions enable/disable
function enable() {
	bringToFront = new bringToFront();
	removeNotification = new removeNotification();
}

function disable() {
	bringToFront.destroy();
	removeNotification.destroy();
}