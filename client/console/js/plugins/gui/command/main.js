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

(function ()
{
	var sb_plugin;

	/* Prepare Plugin */
    define(

		sb_plugin =
		{
			init: function ()
			{
				/* Capture Triple Click Event to Clear Command Entry */
				jQuery('#command').bind('tripleclick', function(event)
				{
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
				
				/* Monitor ENTER Key Press on Command Entry */
				jQuery('#command').keypress(function(e)
				{
					code = (e.keyCode ? e.keyCode : e.which);
					if (code == 13)
					{
						/* Make Sure Something was Entered */
						if(jQuery('#command').val() != '')
						{
							/* Send Javascript Command to Socketbug */
							socketbug.js(jQuery('#command').val());
							e.preventDefault();
							
							jQuery('#command').val('');
						}
					}
				});
	        }
	    }
	);
	
	/* Initialize Plugin */
	sb_plugin.init();
	
}());