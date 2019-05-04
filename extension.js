const Main = imports.ui.main;
const WindowAttentionHandler = imports.ui.windowAttentionHandler;
const Lang = imports.lang;

class bringToFront {
	constructor() {
		this._handlerid = global.display.connect('window-demands-attention', Lang.bind(this, this._onWindowDemandsAttention));
	}

	_onWindowDemandsAttention (display, window) {
		let time = global.get_current_time();
		window.activate(time);
		window.focus(time);
	}

	destroy() {
		global.display.disconnect(this._handlerid);
	}
};

class removeNotification {
	constructor() {
		global.display.disconnect(Main.windowAttentionHandler._windowDemandsAttentionId);
	}

	destroy() {
		global.display.disconnect(this._handlerid);
	}
}

let notificationRemover;
let btf;

function init() {}

function enable() {
	btf = new bringToFront();
	notificationRemover = new removeNotification();
}

function disable() {
	btf.destroy();
	notificationRemover.destroy();
}
