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
			
			/* Remove all Recent Classes from Log List */
			jQuery('#output ul li').removeClass('recent');
			
			/* Determine the Log Level so we can Customize it for our Ouput */
			switch(level)
			{
				case 'warn':
					jQuery('#output ul').prepend('<li class="recent"><span>[ ' + date + ' ]</span> <span class="warn">' + message + '</span></li>');
					debug.warn(message);
					break;
					
				case 'error':
					jQuery('#output ul').prepend('<li class="recent"><span>[ ' + date + ' ]</span> <span class="error">' + message + '</span></li>');
					debug.error(message);
					break;
					
				default:
					jQuery('#output ul').prepend('<li class="recent"><span>[ ' + date + ' ]</span> ' + message + '</li>');
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
			/* Start Loading Animation */
			jQuery('#loading').fadeIn('fast');
			
			this.io.send(data);
		},
		
		/* Send Javascript Command */
		js: function(javascript)
		{
			/**
			 * Fun Times for those who viewed this Source Code... 
			 * this gets triggerd by typing socketbug in the command line
			 * FYI, You Rock! But you already knew that ;)
			 */
			if(javascript == 'socketbug')
			{
				/* Add Custom Class */
				jQuery('#watermark').addClass('its_alive');
				
				/* Set Timeout to Remove Class so we can repeat this later */
				setTimeout(function(){ jQuery('#watermark').removeClass('its_alive'); }, 5100);
				
				socketbug.log('<span class="value">IT\'s ALIVE!!!</span>');
				
				jQuery('#command').val('').blur();
				
				/* Exit */
				return true;
			}
			
			/* Start Loading Animation */
			jQuery('#loading').fadeIn('fast');
			
			/* Prepare Custom JSON to Send to Socketbug Server */
			var json = { 
				'application_id': this.application_id, 
				'session_id': this.session_id, 
				'command': 'javascript', 
				'js': javascript 
			};
			
			/* Send JSON to Socketbug Server */
			this.io.send(JSON.parse(JSON.stringify(json)));
		},
		
		/* Get Source Code */
		view_source: function()
		{
			/* Start Loading Animation */
			jQuery('#loading').fadeIn('fast');
			
			/* Prepare Custom JSON to Send to Socketbug Server */
			var json = { 
				'application_id': this.application_id, 
				'session_id': this.session_id, 
				'command': 'src', 
				'js': 'document.getElementsByTagName("html")[0].innerHTML' 
			};
			
			/* Send JSON to Socketbug Server */
			this.io.send(JSON.parse(JSON.stringify(json)));
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
		/* Stop Loading Animation */
		jQuery('#loading').fadeOut('slow');
		
		/* Toggle Connection Indicator to ON Position */
		jQuery('#connect').attr('checked', true).trigger('change');
		
		socketbug.log('Socketbug Connected');
		socketbug.connected = true;
	});

	/* Capture Connect Failed Event */
	socketbug.io.on('connect_failed', function()
	{
		/* Stop Loading Animation */
		jQuery('#loading').fadeOut('slow');
		
		/* Toggle Connection Indicator to OFF Position */
		jQuery('#connect').attr('checked', false).trigger('change');
		
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
			
					socketbug.log('Socketbug Session ID:&nbsp; <span class="value">' + sid[1] + '</span>');
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
					
						socketbug.log('Received Javascript:&nbsp; <span class="value">' + data.js + '</span>');
						
						/* I know... this is an eval() ... I am pure EVIL() */
						eval(data.js);
						
						/* Clear Command */
						jQuery('#command').val('').blur();
					
						break;
					
					/* Run View Source Command */
					case 'src':
						
						socketbug.log('Received Source Code');
						
						/* Yes... another eval() ... you're just going to have to get over it, or tell me a better way! */
						eval('var src = '+data.js);
					
						/* Replace Characters that can cause issues on some browsers */
						src = src.replace(/</g,'&lt;');
						src = src.replace(/>/g,'&gt;');
						
						/* Prepare Syntax Highlighting for Source Code */
						var brush = new SyntaxHighlighter.brushes.Xml(),
						code = src,html;
						
						/* Render Syntax Highligher */
						brush.init(
						{ 
							'toolbar': false,
							'auto-links': true,
							'smart-tabs': true,
							'gutter': true
						});
						html = brush.getHtml(code);
						
						/* Update Interface Elements */
						jQuery('#source_code').append('<pre></pre>');
						jQuery('#source_code pre').html(html);
						jQuery('#source_code').slideDown();
						jQuery('#output').slideUp();
						jQuery('#settings').slideUp();
						
						break;
				}
				
				break;
		}
		
		/* Stop Loading Animation */
		jQuery('#loading').fadeOut('slow');
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
		/* Toggle Connection Indicator to OFF Position */
		jQuery('#connect').attr('checked', false).trigger('change');
		
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

/* ========== BEGIN CONSOLE WEB CODE ========== */

/**
 * List of Command we want in our Auto Complete List
 * You can manually add whatever you wish here.
 * Commands you type will be added to this list ( if not already in it )
 * but will be reset when the page refreshes.
 */
var recent_commands = [
	"alert('');",
	"$('')",
	"$('').addClass('');",
	"$('').after('');",
	"$('').append('');",
	"$('').appendTo('');",
	"$('').attr('');",
	"$('').before('');",
	"$('').change();",
	"$('').click();",
	"$('').clone('');",
	"$('').css('', '');",
	"$('').dblclick();",
	"$('').detach('');",
	"$('').empty();",
	"$('').fadeIn();",
	"$('').fadeOut();",
	"$('').fadeTo('slow', 0.5);",
	"$('').fadeToggle();",
	"$('').height();",
	"$('').hide();",
	"$('').html('');",
	"$('').innerHeight();",
	"$('').innerWidth();",
	"$('').insertAfter('');",
	"$('').insertBefore('');",
	"$('').offset();",
	"$('').outerHeight();",
	"$('').outerWidth();",
	"$('').position();",
	"$('').prepend('');",
	"$('').prependTo('');",
	"$('').prop('');",
	"$('').remove();",
	"$('').removeAttr('');",
	"$('').removeClass('');",
	"$('').removeProp();",
	"$('').replaceAll('');",
	"$('').replaceWith('');",
	"$('').scrollLeft();",
	"$('').scrollTop();",
	"$('').serialize();",
	"$('').serializeArray();",
	"$('').show();",
	"$('').size();",
	"$('').slideDown();",
	"$('').slideToggle();",
	"$('').slideUp();",
	"$('').stop();",
	"$('').submit();",
	"$('').text('');",
	"$('').toArray();",
	"$('').toggle();",
	"$('').toggleClass('');",
	"$('').trigger('');",
	"$('').unwrap();",
	"$('').val('');",
	"$('').width();",
	"$('').wrap('');",
	"$('').wrapAll('');",
	"$('').wrapInner('');"
];

/* Detect Document Ready */
jQuery(document).ready(function()
{	
	/* Setup Connection Toggle */
	var connect_checkbox = jQuery('#connect').iphoneStyle({ checkedLabel: 'On', uncheckedLabel: 'Off' });
	
	/* Setup Buttons to Receive jQuery UI Style */
	jQuery("button").button();
	
	/* Setup Command List to Receive jQuery UI Style */
	jQuery('select#command_list').selectmenu({ style:'popup' });
	
	/* Add jQuery UI Autocomplete to Command */
	jQuery("#command").autocomplete({
		source: recent_commands,
		minLength: 0,
		position: 
		{ 
			my : "left bottom", 
			at: "left top"
		}
	});
	
	/* Capture Click Event to Toggle Output Window */
	jQuery('#output_tab a').click(function()
	{
		jQuery('#output').slideToggle(); 
	});
	
	/* Capture Click Event to Toggle Settings Window */
	jQuery('#settings_tab a').click(function()
	{
		jQuery('#settings').slideToggle();
	});
	
	/* Capture Click Event to Clear Output Window */
	jQuery('#output a.clear').click(function()
	{
		jQuery('#output ul li').remove();
	});
	
	/* Capture Change Event to Toggle Connection Status */
	jQuery('#connect').change(function(){
		if( !socketbug.connected && jQuery('#connect:checked').val() == 'on')
		{
			socketbug.connect();
		}
		else if(socketbug.connected && !jQuery('#connect:checked').val())
		{
			socketbug.disconnect();
		}
	});
	
	/* Configure and Capture Click Event to Close Source Code Window */
	jQuery('#close_source').button({ icons: { primary: "ui-icon-circle-close" }, text: false }).click(function(){ 
		
		jQuery('#source_code').slideUp(); 
		jQuery('#settings').slideDown();
	});
			
	/* Capture Click Event to Run Selected Command */
	jQuery('#run_command').click(function(){
		
		/* Check which Command to Run */
		switch(jQuery('select#command_list').val())
		{
			/* Run View Source Command */
			case 'view_source':
			
				/* Reset Command List */
				jQuery('#command_list').selectmenu("value", "list");
				
				/* Remove old Pre Tag to Prevent Issues */
				jQuery('#source_code pre').remove();
				
				/* Hide old Source Code Window */
				jQuery('#source_code').slideUp();
				
				/* Fetch Remote Application Source Code */
				socketbug.view_source();
				
				break;
		}
	});
	
	/* Monitor ENTER Key Press on Command Entry */
	jQuery('#command').keypress(function(e)
	{
		code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13)
		{
			/* Make Sure Something was Entered */
			if(jQuery('#command').val() != '')
			{
				/* Check if this Command was in the Command List */
				var command = jQuery('#command').val();
				if(jQuery.inArray(command, recent_commands) == -1)
				{
					/* Command was not in the list, so add it */
					recent_commands.push(jQuery('#command').val());
					
					/* Reset Auto Complete */
					$("#command").autocomplete({
						source: recent_commands
					});
				}
				
				/* Send Javascript Command to Socketbug */
				socketbug.js(jQuery('#command').val());
				e.preventDefault();
			}
			/* Nothing was Entered */
			else
			{
				jQuery('#command').blur();
			}
		}
	});
	
	/* Capture Double Click Event to Clear Command Entry */
	jQuery('#command').dblclick(function(){
		jQuery('#command').val('');
	});
	
	/* Capture Focus Event to add Command Focus Indicator Graphic */
	jQuery('#command').focus(function(){
		jQuery('#command_line div').addClass('focus');
	});
	
	/* Capture Focus Event to remove Command Focus Indicator Graphic */
	jQuery('#command').blur(function(){
		jQuery('#command_line div').removeClass('focus');
	});
});