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

var helpers = _sbs.helpers;
var libraries = _sbs.libraries;
var plugins = _sbs.plugins;

require(
	/* Set Base URL Path */
	{ 
		baseUrl: './js/' 
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