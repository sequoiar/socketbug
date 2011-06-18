![Socketbug Logo](http://github.socketbug.com/logo.png "Socketbug - Web Socket Remote Debuggin")

![License](http://github.socketbug.com/lgplv3.png "LGPL v3 license") Socketbug is licensed under the LGPL v3 license.

---

**![Twitter ](http://github.socketbug.com/twitter.png) [ Follow Updates @socketbug_dev](https://twitter.com/#!/socketbug_dev "Follow Socketbug on Twitter")**

**![Twitter ](http://github.socketbug.com/bug.png) [ Support & Feature Requests](http://socketbug.userecho.com/)**

---

#Installing Socketbug - The Server

## #1 Build and Install Node.js

**FOLLOW ORIGINAL INSTRUCTIONS [FOUND HERE](https://github.com/joyent/node/wiki/Installation "Building and Installing Node.js").**

We preferred the following setup for our Linux installation:

    git clone --depth 1 https://github.com/joyent/node.git
    cd node
    git checkout origin/v0.4
    export JOBS=2
    sudo ./configure --prefix=/usr
    sudo make
    sudo make install

## #2 Setup Socketbug to use Node.js

	sudo mkdir /usr/local/socketbug/
	sudo chmod 777 /usr/local/socketbug
	cd /usr/local/socketbug

## #3 Install Required Node Packages

**While still in the /usr/local/socketbug directory, run the following commands**

Install Node.js Package **socket.io**:

	sudo npm install socket.io

Install Node.js Package **base64**:

	sudo npm install base64
	
## #4 Copy socketbug.js file