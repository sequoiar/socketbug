var socket;

/**
 * Debug Level:
 *
 * 5: log, debug, info, warn & error
 * 4: debug, info, warn & error
 * 3: info, warn & error
 * 2: warn & error
 * 1: error
 * 0: disabled
 */

var debug_level = 5;

//if(typeof(console) === 'undefined')
//{
//    var console = {};
//    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
//}
//
//if(typeof(debug) === 'undefined')
//{
//	window.debug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();
//}

/*!
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

// Script: JavaScript Debug: A simple wrapper for console.log
//
// *Version: 0.4, Last Updated: 6/22/2010*
// 
// Tested with Internet Explorer 6-8, Firefox 3-3.6, Safari 3-4, Chrome 3-5, Opera 9.6-10.5
// 
// Home       - http://benalman.com/projects/javascript-debug-console-log/
// GitHub     - http://github.com/cowboy/javascript-debug/
// Source     - http://github.com/cowboy/javascript-debug/raw/master/ba-debug.js
// (Minified) - http://github.com/cowboy/javascript-debug/raw/master/ba-debug.min.js (1.1kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Support and Testing
// 
// Information about what browsers this code has been tested in.
// 
// Browsers Tested - Internet Explorer 6-8, Firefox 3-3.6, Safari 3-4, Chrome
// 3-5, Opera 9.6-10.5
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Examples - http://benalman.com/code/projects/javascript-debug/examples/debug/
// 
// About: Revision History
// 
// 0.4 - (6/22/2010) Added missing passthrough methods: exception,
//       groupCollapsed, table
// 0.3 - (6/8/2009) Initial release
// 
// Topic: Pass-through console methods
// 
// assert, clear, count, dir, dirxml, exception, group, groupCollapsed,
// groupEnd, profile, profileEnd, table, time, timeEnd, trace
// 
// These console methods are passed through (but only if both the console and
// the method exists), so use them without fear of reprisal. Note that these
// methods will not be passed through if the logging level is set to 0 via
// <debug.setLevel>.

window.debug = (function(){
  var window = this,
    
    // Some convenient shortcuts.
    aps = Array.prototype.slice,
    con = window.console,
    
    // Public object to be returned.
    that = {},
    
    callback_func,
    callback_force,
    
    // Default logging level, show everything.
    log_level = 9,
    
    // Logging methods, in "priority order". Not all console implementations
    // will utilize these, but they will be used in the callback passed to
    // setCallback.
    log_methods = [ 'error', 'warn', 'info', 'debug', 'log' ],
    
    // Pass these methods through to the console if they exist, otherwise just
    // fail gracefully. These methods are provided for convenience.
    pass_methods = 'assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace'.split(' '),
    idx = pass_methods.length,
    
    // Logs are stored here so that they can be recalled as necessary.
    logs = [];
  
  while ( --idx >= 0 ) {
    (function( method ){
      
      // Generate pass-through methods. These methods will be called, if they
      // exist, as long as the logging level is non-zero.
      that[ method ] = function() {
        log_level !== 0 && con && con[ method ]
          && con[ method ].apply( con, arguments );
      }
      
    })( pass_methods[idx] );
  }
  
  idx = log_methods.length;
  while ( --idx >= 0 ) {
    (function( idx, level ){
      
      // Method: debug.log
      // 
      // Call the console.log method if available. Adds an entry into the logs
      // array for a callback specified via <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.log( object [, object, ...] );                               - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      // Method: debug.debug
      // 
      // Call the console.debug method if available, otherwise call console.log.
      // Adds an entry into the logs array for a callback specified via
      // <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.debug( object [, object, ...] );                             - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      // Method: debug.info
      // 
      // Call the console.info method if available, otherwise call console.log.
      // Adds an entry into the logs array for a callback specified via
      // <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.info( object [, object, ...] );                              - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      // Method: debug.warn
      // 
      // Call the console.warn method if available, otherwise call console.log.
      // Adds an entry into the logs array for a callback specified via
      // <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.warn( object [, object, ...] );                              - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      // Method: debug.error
      // 
      // Call the console.error method if available, otherwise call console.log.
      // Adds an entry into the logs array for a callback specified via
      // <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.error( object [, object, ...] );                             - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      that[ level ] = function() {
        var args = aps.call( arguments ),
          log_arr = [ level ].concat( args );
        
        logs.push( log_arr );
        exec_callback( log_arr );
        
        if ( !con || !is_level( idx ) ) { return; }
        
        con.firebug ? con[ level ].apply( window, args )
          : con[ level ] ? con[ level ]( args )
          : con.log( args );
      };
      
    })( idx, log_methods[idx] );
  }
  
  // Execute the callback function if set.
  function exec_callback( args ) {
    if ( callback_func && (callback_force || !con || !con.log) ) {
      callback_func.apply( window, args );
    }
  };
  
  // Method: debug.setLevel
  // 
  // Set a minimum or maximum logging level for the console. Doesn't affect
  // the <debug.setCallback> callback function, but if set to 0 to disable
  // logging, <Pass-through console methods> will be disabled as well.
  // 
  // Usage:
  // 
  //  debug.setLevel( [ level ] )                                            - -
  // 
  // Arguments:
  // 
  //  level - (Number) If 0, disables logging. If negative, shows N lowest
  //    priority levels of log messages. If positive, shows N highest priority
  //    levels of log messages.
  //
  // Priority levels:
  // 
  //   log (1) < debug (2) < info (3) < warn (4) < error (5)
  
  that.setLevel = function( level ) {
    log_level = typeof level === 'number' ? level : 9;
  };
  
  // Determine if the level is visible given the current log_level.
  function is_level( level ) {
    return log_level > 0
      ? log_level > level
      : log_methods.length + log_level <= level;
  };
  
  // Method: debug.setCallback
  // 
  // Set a callback to be used if logging isn't possible due to console.log
  // not existing. If unlogged logs exist when callback is set, they will all
  // be logged immediately unless a limit is specified.
  // 
  // Usage:
  // 
  //  debug.setCallback( callback [, force ] [, limit ] )
  // 
  // Arguments:
  // 
  //  callback - (Function) The aforementioned callback function. The first
  //    argument is the logging level, and all subsequent arguments are those
  //    passed to the initial debug logging method.
  //  force - (Boolean) If false, log to console.log if available, otherwise
  //    callback. If true, log to both console.log and callback.
  //  limit - (Number) If specified, number of lines to limit initial scrollback
  //    to.
  
  that.setCallback = function() {
    var args = aps.call( arguments ),
      max = logs.length,
      i = max;
    
    callback_func = args.shift() || null;
    callback_force = typeof args[0] === 'boolean' ? args.shift() : false;
    
    i -= typeof args[0] === 'number' ? args.shift() : max;
    
    while ( i < max ) {
      exec_callback( logs[i++] );
    }
  };
  
  return that;
})();


debug.setLevel(debug_level);
debug.setCallback(socketbug, true);

function socketbug( level )
{
	var args = Array.prototype.slice.call( arguments, 1 );
	ws_log(level, args);
};

function ws_log(level, args)
{
	socket.send(args);
	
//	switch(level)
//	{
//		/* STANDARD DEBUGGING */
//		case 'log':
//			if(debug_level >= 5)
//			{
//				console.log(args);
//			}
//			break;
//			
//		case 'debug':
//			if(debug_level >= 4)
//			{
//				console.debug(args);
//			}
//			break;
//			
//		case 'info':
//			if(debug_level >= 3)
//			{
//				console.info(args);
//			}
//			break;
//			
//		case 'warn':
//			if(debug_level >= 2)
//			{
//				console.warn(args);
//			}
//			break;
//			
//		case 'error':
//			if(debug_level >= 1)
//			{
//				console.error(args);
//			}
//			break;
//		
//		/* PASSTHROUGH DEBUGGING */
//		case 'assert':
//			console.assert(args);
//			break;
//			
//		case 'clear':
//			console.clear();
//			break;
//			
//		case 'dir':
//			console.dir(args);
//			break;
//			
//		case 'dirxml':
//			console.dirxml(args);
//			break;
//			
//		case 'trace':
//			console.trace();
//			break;
//			
//		case 'group':
//			console.group(args);
//			break;
//			
//		case 'groupCollapsed':
//			console.groupCollapsed(args);
//			break;
//			
//		case 'groupEnd':
//			console.groupEnd();
//			break;
//			
//		case 'time':
//			console.time(args);
//			break;
//			
//		case 'timeEnd':
//			console.timeEnd(args);
//			break;
//			
//		case 'profile':
//			console.profile(args);
//			break;
//			
//		case 'profileEnd':
//			console.profileEnd();
//			break;
//			
//		case 'count':
//			console.count(args);
//			break;
//			
//		case 'exception':
//			console.exception(args);
//			break;
//			
//		case 'table':
//			console.table(args);
//			break;
//	}
};

function socketbug_init()
{
	var host = "ws://localhost:8000/socketbug/server/php/socketbug.php";
	try
	{
		socket = new WebSocket(host); 
		socket.onopen = function(msg)
		{
			console.log('Web Socket Opened');
		};
		socket.onmessage = function(msg)
		{
			//console.log(msg.data);
                        
                        
                        if(typeof(msg.data) === 'undefined')
			{	
				console.error('msg.data is undefined');
				console.error(msg);
			}
			else
			{				
				
                                // Grab the JSON object as a string
				var json = JSON.stringify(msg.data);
                               
                               // Check if the first character of the string is NULL.  
                               // Notice that we have to escape the Unicode version of the character with a preceding backslash, 
                               // otherwise the browser will translate it to an actual NULL character in this document
				if(json.substr(1, 6) == '\\u0000'){
				
                                        // Trim the NULL character representation off the front of the string
                                        json = '"'+json.substr(7, json.length);
					
				}
				
                                // First call to JSON.parse() unescapes backslashes
				json = JSON.parse( json );
								
                                // Second call to JSON.parse() converts the JSON string into an actual Javascript Object
				var data = JSON.parse( json );
				
				console.log(data);
				
				try
				{
					for (user in data)
					{
						if (data[user].id)
						{
							var user_id = data[user].id;
							console.log(user_id);
						}
					}										
				}
				catch(err)
				{
					console.error('Try Catch Failed');
					console.error(err);
				}
			}
		};
		socket.onclose = function(msg)
		{
			console.warn('Web Socket Closed');
		};
		socket.onerror = function(msg)
		{
			console.error('THERE IS AN ERROR'+msg);
		};
	}
	catch(err)
	{
		console.error(err);
	}
};

window.onload = function()
{
	socketbug_init();
}