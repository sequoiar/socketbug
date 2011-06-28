[__Home__](http://manifestinteractive.github.com/socketbug)  &nbsp;&middot;&nbsp;  [Install Server](http://manifestinteractive.github.com/socketbug/install_server.html)  &nbsp;&middot;&nbsp;  [Install Application](http://manifestinteractive.github.com/socketbug/install_application.html)  &nbsp;&middot;&nbsp;  [Install Console](http://manifestinteractive.github.com/socketbug/install_console.html)

---

![Socketbug Logo](http://github.socketbug.com/logo.png "Socketbug - Remote Debugging using Socket.IO")

![License](http://github.socketbug.com/lgplv3.png "LGPL v3 license") Socketbug is licensed under the LGPL v3 license.

---

**![Vimeo ](http://github.socketbug.com/information.png) [ Video Tutorials ( HD )](http://www.vimeo.com/user7532036/videos)**

**![Twitter ](http://github.socketbug.com/twitter.png) [ Follow Updates @socketbug_dev](https://twitter.com/#!/socketbug_dev "Follow Socketbug on Twitter")**

**![Support ](http://github.socketbug.com/bug.png) [ Support & Feature Requests](http://socketbug.userecho.com/)**

#Socketbug Introduction

##Socketbug Requirements

 * **Node.js** ( v0.4+ )

 * **Socket.IO** ( v0.7+ )

 * **Knowledge on how to use git**

 * **Knowledge on how to use a Terminal Window**

##Socketbug - What is it?

The technology behind Mobile Web Applications has been growing at a tremendous rate.  Mobile Application Developers, while able to produce amazing applications, are limited by the native browsers own limited functionality. Basic features available on desktop browsers are completely absent from mobile browsers. The ability to view source code, debug javascript, or even execute a javascript command from a console are all tools developers have come to expect while developing websites.  So why are these features lacking for mobile web application developers?

This is where Socketbug fills the gap! Socketbug is a Remote Debugging Utility built using [Socket.IO](http://socket.io "Socket.IO"). This means you can now use modern browsers ( both mobile and desktop ) to work together to allow you to remotely debug you mobile web applications.

##Debugging your Mobile Applications with Socketbug

Socketbug is built on top of [Node.js](http://nodejs.org/ "Check out Node.js") using [Socket.IO](http://socket.io/ "Check out Node.js") (currently v0.7) as the main backend for communication. Socket.IO automatically determines what communication transport to use and enables your mobile application to send/receive messages from other connected devices.

To use Socketbug you will need to install our server code in a central location that will be accessible by all devices that will be sending or receiving data.  This can be anything from your laptop/desktop, or a remote server.  There are no Cross Domain issues to worry about so you do not have to have Socketbug installed on the same machine that your mobile application is installed on.

To make things easy, Socketbug also has a native console that was created for you to connect to your Socketbug Server.  Once your server is installed you should literally just need to copy some javascript code into your Mobile Application, and then open up the Socketbug Console.