#!/bin/bash
#
# description: Socketbug Server - Start
# author: Manifest Interactive, LLC

# Get Current Directory
BASEDIR=$(dirname $0)

# Start Server
forever start -a -l $BASEDIR/logs/socketbug.log -o $BASEDIR/logs/socketbug_out.log -e $BASEDIR/logs/socketbug_debug.log $BASEDIR/socketbug_server.js