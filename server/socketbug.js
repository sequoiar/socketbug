/* ========== BEGIN SOCKETBUG SERVER CODE ========== */

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
	socketbug = (function(){
		
		/* Socketbug Server Port Number */
		var server_port = 8080;
		
		/* Node.js Requirements */
		var sys    = require('sys'),
		    http   = require('http'),
		    io     = require('socket.io');
		
		/* Create Socketbug Server */
		var server = http.createServer( function(request, response){} );
		
		/* Setup Server to Listen to Custom Port */
		server.listen(server_port);
		
		/* Setup Socket.io to Listen to Server */
		io = io.listen(server);
		io.on('connection', 
			function(client)
			{
				sys.debug('Client ' + client.sessionId + ' Socketbug Connected');
				
				client.send('sessionid:' + client.sessionId);
				
				// Capture Client Message Event
				client.on('message', function(data)
				{
					sys.debug('Client ' + client.sessionId + ' Sent Message Containing ' + typeof(data));
					
					switch(typeof(data))
					{
						case 'string':
							// send message only to client who posted message
							io.clients[client.sessionId].send('Message Received: ' + data);
							//client.send();
							
							break;
							
						case 'object':
							io.clients[client.sessionId].send(data);
							break;
					}
				});
				
				// Capture Client disconnect Event
				client.on('disconnect', function()
				{
					sys.debug('Client ' + client.sessionId + ' Socketbug Disconnected');
				});
				
				// Capture Client reconnect Event
				client.on('reconnect', function(transport_type, reconnectionAttempts)
				{
					sys.debug('Client ' + client.sessionId + ' Successfully Reconnected to Socketbug via ' + transport_type + ' with Attempt #' + reconnectionAttempts);
				});
				
			}
		);
		
	})();
}