![Socketbug Logo](http://github.socketbug.com/logo.png "Socketbug - Remote Debugging using Socket.IO")

![License](http://github.socketbug.com/lgplv3.png "LGPL v3 license") Socketbug is licensed under the LGPL v3 license.

---

**![Twitter ](http://github.socketbug.com/twitter.png) [ Follow Updates @socketbug_dev](https://twitter.com/#!/socketbug_dev "Follow Socketbug on Twitter")**

**![Twitter ](http://github.socketbug.com/bug.png) [ Support & Feature Requests](http://socketbug.userecho.com/)**

#Socketbug - What is it?

Socketbug is a Remote Debugging Utility built using [Socket.IO](http://socket.io "Socket.IO").

#Debugging your Mobile Applications with Socketbug

#Installing Socketbug - The Server

**Please Note:**  We are assuming with the following instructions, that you want to build a local copy of the Socketbug Server.  If this is the case, then we are also going to assume that you have working knowledge of how to use git.  Git will be used for almost every part of setting up the Socketbug server.  If you need more information on how to use git, please check out the following sites for your Operating System:

*   [Set Up Git - Linux](http://help.github.com/mac-set-up-git/ "Set Up Git - Linux")
*   [Set Up Git - Mac OSX](http://help.github.com/linux-set-up-git "Set Up Git - Mac OSX")
*   [Set Up Git - Windows](http://help.github.com/win-set-up-git "Set Up Git - Windows")

## #1 Build and Install Node.js

**FOLLOW ORIGINAL INSTRUCTIONS [FOUND HERE](https://github.com/joyent/node/wiki/Installation "Building and Installing Node.js").**

We preferred the following setup for our Linux installation:

First, change to a temp directory where you can download the source code for building. We like /usr/local/src as it is available on most Unix based machines.

	cd /usr/local/src

    git clone --depth 1 https://github.com/joyent/node.git
    cd node
    git checkout origin/v0.4
    export JOBS=2
    sudo ./configure --prefix=/usr
    sudo make
    sudo make install

## #2 Setup Socketbug to use Node.js

Pick a place on your server where you want to install the Socketbug server. For this writeup, we will use /usr/local/socketbug.  You can use whatever directory you wish.

	sudo mkdir /usr/local/socketbug/
	sudo chmod 777 /usr/local/socketbug
	cd /usr/local/socketbug

## #3 Install Required Node Package

**While still in the /usr/local/socketbug directory, run the following commands**

Install Node.js Package **socket.io**:

	sudo npm install socket.io
	
## #4 Install Optional Node Package

Install Node.js Package **forever** ( to run Socketbug as a service ):

	sudo npm install forever -g
	
You will need this if you want to use our bash scripts.
	
## #5 Download Socketbug

If are using git, you can just run the following command from the directory you already setup for Socketbug:

    git clone https://github.com/manifestinteractive/socketbug.git .

Notice the '.' at the end of the git command.  This will check it out in your current directory, rather than creating a new directory for you.