/* ========== BEGIN THRID PARTY DEGUG CODE ========== */

/**
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
if(typeof(debug) === 'undefined')
{
	window.debug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();
}

/* ========== BEGIN SOCKETBUG APPLICATION CODE ========== */

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
if(typeof(socketbug) === 'undefined')
{
	var socketbug = {

		/* Check if we're connected to Socketbug */
		connected: false,
		
		/* Store Socketbug Console Session ID */
		session_id: null,
		
		/* Setup Socket.io to Listen to Server */
		io: new io.Socket(_sbs.host, { port: _sbs.port, rememberTransport: false }),
		
		/* Setup Ouput Log for Console */
		log: function(message, level)
		{
			/**
			 * Using CONSOLE here and NOT DEBUG to prevent looping back 
			 * to Socketbug since DEBUG has a callback handler 
			 * to return data to Socketbug 
			 */
			switch(level)
			{
				case 'warn':
					console.warn(message);
					break;
					
				case 'error':
					console.error(message);
					break;
					
				default:
					console.log(message);
			}			
		},
		
		/* Capture All Debug Events and send them through Socketbug */
		debug: function(level)
		{
			var args = Array.prototype.slice.call( arguments, 1 );
			send = {
				'command': 'debug',
				'mode': 'application',
				'application_id': _sbs.application_id,
				'application_name': _sbs.application_name,
				'group_id': _sbs.group_id,
				'group_name': _sbs.group_name,
				'debug_level': level,
				'debug_message': args
			};
		
			socketbug.send(send);			
		},
		
		/* Direct Connect Method */
		connect: function()
		{
			this.io.connect();
		},
		
		/* Direct Disconnect Method */
		disconnect: function()
		{
			this.io.disconnect();
		},
		
		/* Direct Send Method */
		send: function(data)
		{
			this.io.send(data);
		}
	};
	
	/* Capture Connecting Event */
	socketbug.io.on('connecting', function(transport_type)
	{
		socketbug.log('Attempting to connect to Socketbug via ' + transport_type + '...');
		socketbug.connected = false;
	});

	/* Capture Connect Event */
	socketbug.io.on('connect', function()
	{
		socketbug.log('Socketbug Connected');
		socketbug.connected = true;
		
		var setup = {
			'init': true,
			'mode': 'application',
			'application_id': _sbs.application_id,
			'application_name': _sbs.application_name,
			'group_id': _sbs.group_id,
			'group_name': _sbs.group_name
		};
		
		socketbug.send(setup);

		/* Do Callback if one set */
		if(_sbs.connect_callback && typeof(_sbs.connect_callback) === "function")
		{
			_sbs.connect_callback();
		}
	});

	/* Capture Connect Failed Event */
	socketbug.io.on('connect_failed', function()
	{
		socketbug.log('Failed to Connect to Socketbug', 'error');
		socketbug.connected = false;
		socketbug.disconnect();
	});

	/* Capture Message Event */
	socketbug.io.on('message', function(data)
	{
		/* Check the kind of data Socketbug Sent Back */
		switch(typeof(data))
		{
			/* This Message is a String */
			case 'string':
				/* Check if this is the Session ID */
				if(data.substring(0,10) == 'sessionid:')
				{
					var sid = data.split(':', 2);
			
					socketbug.log('Socketbug Session ID: ' + sid[1]);
					socketbug.session_id = sid[1];
				}
		
				break;
			
			/* This Message is an Object */
			case 'object':
				
				/* Check what Command Socketbug Sent */
				switch(data.command)
				{
					/* Run Javascript Command */
					case 'javascript':
					
						if(data.mode == 'console')
						{
							socketbug.log('Received Javascript:&nbsp; <span class="value">' + data.js + '</span>');
							
							var json = { 
								'session_id': this.session_id,
								'mode': 'application',
								'application_id': _sbs.application_id,
								'application_name': _sbs.application_name,
								'group_id': _sbs.group_id,
								'group_name': _sbs.group_name, 
								'command': 'javascript',
								'js': data.js
							};
							
							/* Send JSON to Socketbug Server */
							socketbug.send(JSON.parse(JSON.stringify(json)));
						
							/* I know... this is an eval() ... I am pure EVIL() */
							eval(data.js);
						}
					
						break;
					
					/* Run View Source Command */
					case 'src':
						
						if(data.mode == 'console')
						{
							socketbug.log('Received Request for Source Code');
						
							/* Yes... another eval() ... you're just going to have to get over it, or tell me a better way! */
							eval('var src = '+data.js);
							
							/* Replace Characters that can cause issues on some browsers */
							src = src.replace(/</g,'&lt;');
							src = src.replace(/>/g,'&gt;');
					
							var json = { 
								'session_id': this.session_id,
								'mode': 'application',
								'application_id': _sbs.application_id,
								'application_name': _sbs.application_name,
								'group_id': _sbs.group_id,
								'group_name': _sbs.group_name, 
								'command': 'src',
								'js': '', 
								'html_code': src 
							};
			
							/* Send JSON to Socketbug Server */
							socketbug.send(JSON.parse(JSON.stringify(json)));
						}
						
						break;
				}
				
				break;
		}
		
		/* Do Callback if one set */
		if(_sbs.message_callback && typeof(_sbs.message_callback) === "function")
		{
			_sbs.message_callback(data);
		}
	});

	/* Capture Close Event */
	socketbug.io.on('close', function()
	{
		socketbug.log('Connection to Socketbug Closed', 'warn');
		socketbug.connected = false;
	});

	/* Capture Disconnect Event */
	socketbug.io.on('disconnect', function()
	{
		socketbug.log('Socketbug Disconnected', 'warn');
		socketbug.connected = false;

		/* Do Callback if one set */
		if(_sbs.disconnect_callback && typeof(_sbs.disconnect_callback) === "function")
		{
			_sbs.disconnect_callback();
		}
	});

	/* Capture Reconnect Event */
	socketbug.io.on('reconnect', function(transport_type, reconnectionAttempts)
	{
		socketbug.log('Successfully Reconnected to Socketbug via ' + transport_type + ' with Attempt #' + reconnectionAttempts);
		socketbug.connected = false;
	});

	/* Capture Reconnecting Event */
	socketbug.io.on('reconnecting', function(reconnectionDelay, reconnectionAttempts)
	{
		socketbug.log('Attempt #' + reconnectionAttempts + ' at Reconnecting to Socketbug...', 'warn');
		socketbug.connected = false;
	});

	/* Capture Close Event */
	socketbug.io.on('reconnect_failed', function()
	{
		socketbug.log('Failed to Reconnect to Socketbug', 'error');
		socketbug.connected = false;
	});
	
	/* Auto Connect to Socketbug when Page Loads */
	(function(){
		
		/* Capture Javascript Errors */
		window.onerror = function(err, url, line)
		{
			debug.error(url + ' Contains a Javascript Error: ' + err + ' ( Line #' + line + ' )');
			return true;
		};
		
		socketbug.connect();
		
		/* Configure Callback Handler to use Socketbug */
		debug.setCallback(socketbug.debug, true);
	})();
}