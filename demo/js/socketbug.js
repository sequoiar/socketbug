/* ========== BEGIN SOCKETBUG CODE ========== */

/**
 * Socketbug Server - v0.1 - 6/16/2011
 *
 * Website: http://www.socketbug.com
 * Cource: http://github.com/manifestinteractive/socketbug
 * 
 * Copyright (c) 2011 Manifest Interactive, LLC
 * Licensed under the LGPL v3 licenses.
 * http://www.socketbug.com/license/
 */
function load_socketbug_js(filename)
{
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', filename);
	
	if (typeof js != 'undefined')
	{
		document.getElementsByTagName('head')[0].appendChild(js);
	}
}

/* Load Required Socketbug Javascript */
window.onload = function()
{
	load_socketbug_js('http://localhost/socketbug/application/socket.io.js');
	load_socketbug_js('http://localhost/socketbug/application/date.format.js');
	load_socketbug_js('http://localhost/socketbug/application/socketbug.js');
	load_socketbug_js('http://localhost/socketbug/application/jquery.js');
}