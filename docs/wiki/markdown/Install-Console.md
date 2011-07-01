**MENU:**&nbsp;&nbsp;&nbsp;[HOME](https://github.com/manifestinteractive/socketbug/wiki)  &nbsp;&middot;&nbsp;  [SERVER](https://github.com/manifestinteractive/socketbug/wiki/Install-Server)  &nbsp;&middot;&nbsp;  [APPLICATION](https://github.com/manifestinteractive/socketbug/wiki/Install-Application)  &nbsp;&middot;&nbsp;  [__CONSOLE__](https://github.com/manifestinteractive/socketbug/wiki/Install-Console)

---

![Vimeo ](http://github.socketbug.com/information.png) [ Video Tutorials ( HD )](http://www.vimeo.com/socketbug/videos)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Twitter ](http://github.socketbug.com/twitter.png) [ Follow Updates @socketbug_dev](https://twitter.com/#!/socketbug_dev "Follow Socketbug on Twitter")&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Support ](http://github.socketbug.com/bug.png) [ Support & Feature Requests](http://socketbug.userecho.com/)

---

![Socketbug Logo](http://github.socketbug.com/logo.png "Socketbug - Remote Debugging using Socket.IO")

![License](http://github.socketbug.com/lgplv3.png "LGPL v3 license") Socketbug is licensed under the LGPL v3 license.

#Socketbug Console Installation Video

###![Vimeo ](http://github.socketbug.com/information.png) [Watch our Video Tutorial on How to do a Socketbug Console Installation](http://www.vimeo.com/socketbug/console-install)

Then you can follow along below ;)

#Installing Socketbug - The Console

###If you have not already setup your Socketbug Server, you should [__DO THIS FIRST__](https://github.com/manifestinteractive/socketbug/wiki/Install-Server).

###Also, If you have not already setup your Socketbug Application, you should [__DO THIS TOO__](https://github.com/manifestinteractive/socketbug/wiki/Install-Application).

With the Socketbug Server up and running, and your Socketbug Application ready for action, it's time to setup the Socketbug Console.

To do this you will need to use the Socketbug Client Side code.  This can be on the same machine that has your server running on it, but it certainly does not have to be.

The purpose of the Client Console code is for you to connect to and manage you Mobile Web Applications through communication with the Socketbug Server.  How you set this up is entirely up to you.

## #1 Setting up the Socketbug Client Console

To connect your Console to Socketbug, you will need public access to the **client** folder contained in the Socketbug Repository.  

###This can be achieved by Hosting the Client Console Code on Your:

 1. **Local Development Machine**

 2. **Central Server**

 3. **Content Distribution Network** ( CDN )

The code that needs to be copied over from the Socketbug Repository is located in the **./client/console/** folder.

If you do not already have a copy of the Socketbug code, you can download the code to a folder of your choice.

If you are running a local server, like Apache, you may want to stick Socketbug in your local servers Document Root.

The Document Root is what is shown when you go to http://localhost/ on your machine. So it might be nice to setup Socketbug in http://localhost/socketbug/ .

If you do not know where your Document Root is, here are a few common locations for some popular Programs:

**XAMPP:**

 * __PC__: C:\xampp\xampp\htdocs
 * __MAC__: /Applications/XAMPP/xamppfiles/htdocs/
	
**MAMP:**

 * __MAC__: /Applications/MAMP/htdocs/

So let's go ahead an assume you need to download Socketbug, and that you want to stick it in your Document Root. Also, just for this example, let's say your Document Root is /var/www/html, as that is pretty common on some servers. 

**Now, let's download Socketbug:**

	cd /var/www/html
	git clone https://github.com/manifestinteractive/socketbug.git

A new folder was created in your Document Root called socketbug and you should be able to access the folder http://localhost/socketbug/ . If you have directory listing turned off, you can got to the example folder to verify you downloaded Socketbug to the correct folder:

http://localhost/socketbug/client/example

## #2 Connect Your Console to Socketbug

To connect your Console to Socketbug, you will need to open the index.html file in the console folder and make some changes.  The file you are looking for should be located:

	http://localhost/socketbug/client/console/index.html

with a relative path from your Socketbug install folder:

	./client/console/index.html
	
Go ahead and open this file in your favorite text editor so we can make some changes.

**Note**: For this example, we are still assuming your Socketbug Client code is located at http://localhost/socketbug/ . You will need to update this if it is not your actual location.

###Here is the code you need to look for:

	<script type="text/javascript">
	var _sbs = _sbs || {

		'version': '0.2.0',
		'host': 'http://localhost',
		'port': 8080,
		'group_id': '4704808A-80A9-6DD3-341F-E18A3F00563A',
		'group_name': 'Socketbug Demo Group',
		'application_id': '5E3E8FB6-86CF-6BF8-B4C4-6B2497BC388C',
		'application_name': 'Socketbug Demo Application',
		'debug_level': 4,
		'helpers': [],
		'libraries': [],
		'plugins': [
			'plugins/gui/command/main',
			'plugins/gui/output/main',
			'plugins/gui/settings/main',
			'plugins/gui/view_source/main',
			'plugins/gui/command/autocomplete'
		]
		
	};
	</script>
	<script type="text/javascript" src="http://localhost/socketbug/client/console/sb.js" async></script>

Before you try to connect, you will need to update some of the variables.  Here is an explanation of what each of them are, and what they do in Socketbug.  The ones labeled as **REQUIRED** are just that. Socketbug will fail if these are not set.  The ones labeled **OPTIONAL** can be left out entirely with no issues.

 * **REQUIRED**: `_sbs.version` _( String )_: **0.2.0**
	
	This should be set to the Current Socketbug Version you are using.
	
 * **REQUIRED**: `_sbs.host` _( String )_: **http://localhost**
	
	This is where the Socketbug Server is located. Make sure to use http:// in the Host URL
	
 * **REQUIRED**: `_sbs.port` _( Number )_: **8080**
	
	This is the Port Number you are Running Socketbug on.
	
 * **REQUIRED**: `_sbs.group_id` _( String )_: **4704808A-80A9-6DD3-341F-E18A3F00563A**
	
	This is the Unique Group ID you want to use. A Group ID is the top most level of a Socketbug Connection.  One Group can have multiple Applications.  Each Application can have multiple Clients.  The Group ID will act to organize your Socketbug Server, while also allowing you to issue a GUID to whomever you wish.  If the Socketbug Server has Authentication enabled, your Group ID's will be verified so you can make sure only users with valid Group ID's can connect.
	
	If you would like a tool to generate GUID's for your team, you can use our Online GUID Generator located here:  
	
	[http://guid.it](http://guid.it)
	
 * **REQUIRED**: `_sbs.group_name` _( String )_: **Socketbug Demo Group**
	
	This is a Human Readable Group Name
	
 * **REQUIRED**: `_sbs.application_id` _( String )_: **5E3E8FB6-86CF-6BF8-B4C4-6B2497BC388C**
	
	This is the Unique Application ID you want to use. An Application ID is the next highest level of a Socketbug Connection.  One Group can have multiple Applications.  Each Application can have multiple Clients.  The Application ID will act to organize your Socketbug Server, while also allowing you to issue a GUID to whomever you wish.  If the Socketbug Server has Authentication enabled, your Application ID's will be verified so you can make sure only users with valid Application ID's can connect.
	
	If you would like a tool to generate GUID's for your team, you can use our Online GUID Generator located here:  
	
	[http://guid.it](http://guid.it)
	
 * **REQUIRED**: `_sbs.application_name` _( String )_: **Socketbug Demo Application**
	
	This is a Human Readable Application Name
	
 * **REQUIRED**: `_sbs.debug_level` _( Number )_: **4**
	
	This sets the amount of Debug Information you wish to capture in your Application:
	
	`5` = log, debug, info, warn, & error  
	`4` = debug, info, warn, & error  
	`3` = info, warn, & error  
	`2` = warn, & error  
	`1` = error  
	`0` = disable all debug messages
	
 * **OPTIONAL**: `_sbs.helpers` _( Array )_: **[ 'relative/path/to/helper', 'http://absolute.path/to/helper' ]**
	
	This is a bracketed array of the javascript files you want to load as helpers.  These will be loaded BEFORE Socketbug and Socket.IO are connected. You do not need to add the .js extension to the file names, but these files should be Javascript files.  Nothing is required here, just a way for you to preload some helper files, if you wanted to. If you are not going to load anything, just leave it as [].
	
 * **OPTIONAL**: `_sbs.libraries` _( Array )_: **[ 'relative/path/to/library', 'http://absolute.path/to/library' ]**
	
	This is a bracketed array of the javascript files you want to load as libraries.  These will be loaded BEFORE Socketbug and Socket.IO are connected. You do not need to add the .js extension to the file names, but these files should be Javascript files. Nothing is required here, just a way for you to preload some library files, if you wanted to. If you are not going to load anything, just leave it as [].
	
 * **REQUIRED**: `_sbs.plugins` _( Array )_: **[ 'relative/path/to/plugin', 'http://absolute.path/to/plugin' ]**
	
	This is a bracketed array of the javascript files you want to load as plugins.  These will be loaded BEFORE Socketbug and Socket.IO are connected. You do not need to add the .js extension to the file names, but these files should be Javascript files. Nothing is required here, just a way for you to preload some plugin files, if you wanted to. The plugins listed in the example are required for the console to function.  You are welcome to add more, but these at least need to be set.
	
	**Note:**  There is a sample native Socketbug plugin in **./client/application/plugins/sample.js**

There are only two more items that need you attention.  The last line that loads the Javascript file has to Paths that need to be set correctly.  Here is what you are looking for:

	<script type="text/javascript" src="http://localhost/socketbug/client/console/sb.js" async></script>

That parts that need your attention are:

 * `src="http://localhost/socketbug/client/console/sb.js"`

	This will need to be set to either an absolute or relative path to wherever your `sb.js` file is located.  This is the file that is locate in `./client/console/sb.js` inside the Socketbug Repository.  This `sb.js` enables functionality to load other Javascript files in sequence to assure everything is loaded in the proper order.  You do not need to make any modifications to this file.  The file will work as is.

## #3 Open the Console

OK, now that you have setup your Console with the Socketbug Javascript, you are ready to connect.

Go ahead and open up the Socketbug Console in your favorite modern browser by going to http://localhost/socketbug/client/console/index.html or wherever you installed your Socketbug console.

To execute a command, type in the input box at the bottom of the Console page.  To run a saved command, like Viewing the Remote Source Code, select the option from the SOCKETBUG COMMAND LIST in the top left of the page.

You can toggle open/close the settings and output windows by clicking on their tabs.

#So Now What?!?

Have fun and Please Help Improve Socketbug with your Feedback at [http://socketbug.userecho.com](http://socketbug.userecho.com)