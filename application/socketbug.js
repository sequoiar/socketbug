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

/* ========== BEGIN SOCKETBUG CONSOLE CODE ========== */

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
if(typeof(socketbug) === 'undefined')
{
	var socketbug = {

		/* Check if we're connected to Socketbug */
		connected: false,
		
		/* Store Socketbug Console Session ID */
		application_id: null,
		
		/* Store Socketbug Console Session ID */
		session_id: null,
		
		/**
		 * Setup Socket.io to Listen to Server
		 * 
		 * This code assumes you have already setup the 
		 * socketbug_server variable on the index.html page
		 * above where you are loading this Javascript file
		 * 
		 * var socketbug_server = 
		 * {
		 *		'host': 'localhost',
		 *		'port': 8080
		 * }; 
		 */
		io: new io.Socket(socketbug_server.host, { port: socketbug_server.port, rememberTransport: false }),
		
		/* Setup Ouput Log for Console */
		log: function(message, level)
		{
			/* Prepare a Date for the Log */
			var now = new Date();
			var date = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
			
			/* Determine the Log Level so we can Customize it for our Ouput */
			switch(level)
			{
				case 'warn':
					debug.warn(message);
					break;
					
				case 'error':
					debug.error(message);
					break;
					
				default:
					debug.log(message);
			}			
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
			'application_id': socketbug_server.application_id,
			'application_name': socketbug_server.application_name,
			'group_id': socketbug_server.group_id,
			'group_name': socketbug_server.group_name
		};
		
		socketbug.io.send(setup);
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
		/* Check Received Data Type */
		socketbug.log('Received Socketbug ' + typeof(data));
		
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
				/* Log all other String based Messages */
				else
				{
					socketbug.log(data);
				}
		
				break;
			
			/* This Message is an Object */
			case 'object':
				
				/* Log the Object to Browser for Debugging */
				debug.log(data);
				
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
								'application_id': socketbug_server.application_id,
								'application_name': socketbug_server.application_name,
								'group_id': socketbug_server.group_id,
								'group_name': socketbug_server.group_name, 
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
								'application_id': socketbug_server.application_id,
								'application_name': socketbug_server.application_name,
								'group_id': socketbug_server.group_id,
								'group_name': socketbug_server.group_name, 
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
	socketbug.io.connect();
}