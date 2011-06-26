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

var GUID={is_valid:function(value){if(typeof(value)=='undefined'){return false;}if(value.length!==36){return false;}rGx=new RegExp("\\b(?:[A-F0-9]{8})(?:-[A-F0-9]{4}){3}-(?:[A-F0-9]{12})\\b");return (rGx.exec(value)!=null);},create:function(){if(arguments.length==1&&this.is_valid(arguments[0])){value=arguments[0];return value;}var res=[];var hv;var rgx=new RegExp("[2345]");for(var i=0;i<8;i++){hv=(((1+Math.random())*0x10000)|0).toString(16).substring(1);if(rgx.exec(i.toString())!=null){if(i==3){hv="6"+hv.substr(1,3);}res.push("-");}res.push(hv.toUpperCase());}value=res.join('');return value;}};