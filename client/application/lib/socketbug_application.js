/**
 * Socketbug - Web Socket Remote Debugging
 *
 * @version v0.2.0 ( 6/25/2011 )
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
	var encryption_salt = 'Ch4ng3^M3';
	
	var socketbug = {

		/* Check if we're connected to Socketbug */
		connected: false,
		
		/* Store Socketbug Session ID */
		session_id: null,
		
		/* Define Group Data */
		group:
		{
			'id': hex_md5(encryption_salt + _sbs.group_id),
			'name': _sbs.group_name
		}, 
		
		/* Define Application Data */
		application:
		{
			'id': hex_md5(encryption_salt + _sbs.application_id),
			'name': _sbs.application_name
		}, 
		
		/* Define Client Data */
		client:
		{
			'id': hex_md5(encryption_salt + GUID.create()),
			'name': ''
		}, 
		
		/** 
		 * Debug Level
		 * 
		 * 5 = log, debug, info, warn, & error
		 * 4 = debug, info, warn, & error
		 * 3 = info, warn, & error
		 * 2 = warn, & error
		 * 1 = error
		 * 0 = disable all debug messages
		 */
		debug_level: _sbs.debug_level,
		
		/* Setup Socket.io to Listeners to Servers Application Sockets */
		sb_manager: io.connect(_sbs.host + ':' + _sbs.port + '/sb_manager'),
		sb_application: io.connect(_sbs.host + ':' + _sbs.port + '/sb_application'),
		sb_console: io.connect(_sbs.host + ':' + _sbs.port + '/sb_console'),
		
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
				case 'log':
					if(_sbs.debug_level == 5)
					{
						console.log(message);
					}
					break;
					
				case 'debug':
					if(_sbs.debug_level >= 4)
					{
						console.debug(message);
					}
					break;
					
				case 'info':
					if(_sbs.debug_level >= 3)
					{
						console.info(message);
					}
					break;
				
				case 'warn':
					if(_sbs.debug_level >= 2)
					{
						console.warn(message);
					}
					break;
					
				case 'error':
					if(_sbs.debug_level >= 1)
					{
						console.error(message);
					}
					break;
			}			
		},
		
		/* Capture All Debug Events and send them through Socketbug */
		debug: function(level)
		{
			var args = Array.prototype.slice.call(arguments, 1);
		
			socketbug.sb_console.emit('debug', level, args, 
				function()
				{
					socketbug.log('Sent Debug info to Remote Console.', 'log');
				}
			);			
		}
	};
	
	/* ================================================== */
	/*            Socketbug Socket.IO Manager             */
	/* ================================================== */
	
	/* Capture Connect Event */
	socketbug.sb_manager.on('connect', function()
	{		
		if(socketbug.connected === false)
		{				
			if( !GUID.is_valid(_sbs.group_id))
			{
				socketbug.log('Invalid Socketbug Group ID', 'error');
			}
			else if( !GUID.is_valid(_sbs.application_id))
			{
				socketbug.log('Invalid Socketbug Application ID', 'error');
			}
			else
			{
				var date = new Date();
			
				socketbug.log('Socketbug Connected');
				socketbug.connected = true;
		
				socketbug.sb_manager.emit('connection_manager', socketbug.group, socketbug.application, socketbug.client, 
					function(session_id)
					{ 
						socketbug.log('Connected to Socketbug with Session ID: '+session_id);
						
						socketbug.session_id = session_id;
						
						/* Do Callback if one set */
						if(typeof(_sbs.connect_callback) == 'function')
						{
							_sbs.connect_callback(session_id);
						}  
					}
				);
			}
		}
	});
	
	/* Capture Failed Authentication Event */
	socketbug.sb_manager.on('authentication_failed', function (group_valid, application_valid)
	{		
		if( !group_valid)
		{
			alert('You are Not Authorized to use Socketbug. Your Group ID is Invalid.');
		}
		if( !application_valid)
		{
			alert('You are Not Authorized to use Socketbug. Your Application ID is Invalid.');
		}
		
		/* Disconnect Client from Socketbug Services */
		socketbug.sb_manager.disconnect();
		socketbug.sb_application.disconnect();
		socketbug.sb_console.disconnect();
	});
	
	/* Capture Failed Authentication Event */
	socketbug.sb_application.on('execute_js', function (javascript)
	{		
		try
		{
			/* I know... this is an eval() ... I am pure EVIL() */
			eval(javascript);
		}
		catch(error)
		{
			socketbug.log(error, 'error');
		}
	});
	
	/* Capture Failed Authentication Event */
	socketbug.sb_application.on('view_source', function ()
	{		
		try
		{
			/* Yes... another eval() ... you're just going to have to get over it, or tell me a better way! */
			var source_code = document.getElementsByTagName("html")[0].innerHTML;
			
			/* Replace Characters that can cause issues on some browsers */
			source_code = source_code.replace(/</g,'&lt;');
			source_code = source_code.replace(/>/g,'&gt;');
			
			/* Send to Specific Client */
			socketbug.sb_console.emit('view_source', source_code);
		}
		catch(error)
		{
			socketbug.log(error, 'error');
		}
	});
	
	/* Capture Connect Event */
	socketbug.sb_manager.on('disconnect', function()
	{
		/* Do Callback if one set */
		if(typeof(_sbs.disconnect_callback) === "function")
		{
			_sbs.disconnect_callback();
		}
	});
	
	/* Capture Responses from Socketbug Manager */
	socketbug.sb_manager.on('manager_response', function (message, level)
	{
		socketbug.log(message, level);
	});	
	
	/* Configure Callback Handler to use Socketbug */
	debug.setCallback(socketbug.debug, true);
	
	/* Set Debug Level for Socketbug Console */
	debug.setLevel(socketbug.debug_level);
}