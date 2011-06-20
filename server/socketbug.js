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
		
		/* Store Clients */
		var socketbug_clients = [];
		
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
							
							client.broadcast(socketbug_clients);
							io.clients[client.sessionId].send(socketbug_clients);
							
							break;
							
						case 'object':
							
							/* Check if this is First Communication */
							if(typeof(data.init) != 'undefined')
							{
								if(data.init)
								{
									/* Check if Client is already List */
									var client_exists = false;
									
									for(sb_client in socketbug_clients)
									{
										if(sb_client['session_id'] == client.sessionId)
										{
											client_exists = true;
											return true;
										}
									}
									
									if(client_exists === false)
									{
										var date = new Date();
									
										var new_client = {
											'mode': data.mode,
											'session_id': client.sessionId,
											'application_id': data.application_id,
											'application_name': data.application_name,
											'group_id': data.group_id,
											'group_name': data.group_name,
											'connected': date
										};
									
										socketbug_clients.push(new_client);	
									}								
								}
							}
							
							/* Pass Object to Application */
							
							/* !!! Add Logic to Only sent to Matching Application IDs */
							io.clients[client.sessionId].send(data);
							client.broadcast(data);
							
							break;
					}
				});
				
				// Capture Client disconnect Event
				client.on('disconnect', function()
				{
					/* Remove Client from List */
					var client_count = 0;
					for(sb_client in socketbug_clients)
					{
						if(sb_client['session_id'] == client.sessionId)
						{
							socketbug_clients.splice(client_count, 1);
							return true;
						}
						client_count++;
					}
					sys.debug('Client ' + client.sessionId + ' Socketbug Disconnected');
				});
				
				// Capture Client reconnect Event
				client.on('reconnect', function(transport_type, reconnectionAttempts)
				{
					sys.debug('Client ' + client.sessionId + ' Successfully Reconnected to Socketbug via ' + transport_type + ' with Attempt #' + reconnectionAttempts);
				});
				
			}
		);
		
		var process_appliation = function(clients, data, application, group)
		{
			
		};
		
	})();
}