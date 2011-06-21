/**
 * Socketbug - Web Socket Remote Debugging
 *
 * @version v0.1.0a ( 6/21/2011 )
 *
 * @link Website: http://www.socketbug.com
 * @link Twitter: http://www.twitter.com/socketbug_dev
 * @link Source: http://github.com/manifestinteractive/socketbug
 * @link Support & Feature Requests: http://socketbug.userecho.com
 * 
 * @copyright Copyright (c) 2011 Manifest Interactive, LLC
 *
 * @license Licensed under the LGPL v3 licenses.
 */
function load_socketbug_js(filename, version)
{
	try
	{
		var br = document.createTextNode('\r\n');
		var sb = document.createElement('script');
		sb.type = 'text/javascript'; 
		sb.async = true;
		sb.src = ('https:' == document.location.protocol 
			? 'https://cdn.socketbug.com/' 
			: 'http://cdn.socketbug.com/') 
			+ _sbs.version 
			+ '/application/'
			+ filename;
	
		var s = document.getElementsByTagName('script')[0]; 
		if(s.parentNode.insertBefore(sb, s) && s.parentNode.insertBefore(br, s))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	catch(err)
	{
		alert('Unable to load ' + filename);
		return false;
	}
}
var tries = 0;
var max_tries = 50;
function check_io()
{
	if(typeof(io) != 'undefined')
	{
		load_socketbug_js('socketbug.js');
	}
	else if(tries <= max_tries)
	{
		setTimeout(check_io, 100);
		tries++;
	}
	else
	{
		alert('Unable to Detect Socket.IO');
	}
}

/* Load Required Socketbug Javascript */
(function(){
	load_socketbug_js('socket.io.js');
	check_io();
})();