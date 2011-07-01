/**
 * Socketbug - Web Socket Remote Debugging
 * 
 * Copyright (c) 2011 Manifest Interactive, LLC
 *
 * Licensed under the LGPL v3 licenses.
 *
 * @version v0.2.0 ( 6/29/2011 )
 *
 * @author <a href="http://www.socketbug.com">Website</a>
 * @author <a href="http://www.vimeo.com/user7532036/videos">Video Tutorials ( HD )</a>
 * @author <a href="http://www.twitter.com/socketbug_dev">Twitter</a>
 * @author <a href="http://github.com/manifestinteractive/socketbug">Source Code</a>
 * @author <a href="http://socketbug.userecho.com">Support & Feature Requests</a>
 */

var helpers = (typeof(_sbs.helpers) != 'undefined') ? _sbs.helpers:new Array();
var libraries = (typeof(_sbs.libraries) != 'undefined') ? _sbs.libraries:new Array();
var plugins = (typeof(_sbs.plugins) != 'undefined') ? _sbs.plugins:new Array();

require(
	/* Set Base URL Path */
	{ 
		baseUrl: sb_base+'js/' 
	},
	
	/* Load Required Files First */
	[
		'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js',
		'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js',
		'helpers/date.format',
		'helpers/debug',
		'helpers/guid',
		'helpers/md5',
		'lib/sh/XRegExp',
	],
	
	/* Set Callback to Check for Helpers, Libraries & Plugins */
	function()
	{
		/* These Libraries will not work until the other files are already loaded */
		require(
			[
				'lib/sh/shCore',
				'lib/sh/shBrushXml',
				'lib/sh/shBrushJScript',
				'lib/sh/shBrushCss',
				'lib/jquery.combobox',
			],
			function()
			{
				load_helpers();
			}
		);
	}
);

/* Load Helpers found in Config */
function load_helpers()
{
	if(helpers.length != 0)
	{
		/* Load Helpers and then load Libraries */
		require(helpers, function ()
		{ 
			load_libraries(); 
		});	
	}
	/* No Helpers, load Socket.IO */
	else
	{
		load_libraries();
	}
};

/* Load Libraries found in Config */
function load_libraries()
{
	if(libraries.length != 0)
	{
		/* Load Libraries and then load Plugins */
		require(libraries, function ()
		{ 
			load_plugins(); 
		});	
	}
	/* No Libraries, load Plugins */
	else
	{
		load_plugins();
	}
};

/* Load Plugins found in Config */
function load_plugins()
{
	if(plugins.length != 0)
	{
		/* Load Plugins and then load Socket.IO */
		require(plugins, function ()
		{ 
			load_socketbug(); 
		});	
	}
	/* No Plugins, load Socket.IO */
	else
	{
		load_socketbug();
	}
};

/* Function to Load Socketbug Core */
function load_socketbug()
{
	/* Load Socket.IO from Config Path */
	require([_sbs.host+':'+_sbs.port+'/socket.io/socket.io.js'], function()
	{	
		/* Now that Socket.IO is loaded we can run Socketbug */
		require(['lib/socketbug_console'], function (){});	
	});
};