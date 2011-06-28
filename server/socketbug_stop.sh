#!/bin/bash
#
# description: Socketbug Server - Stop
# author: Manifest Interactive, LLC

# Get Current Directory
BASEDIR=$(dirname $0)

# Stop Server
forever stop $BASEDIR/socketbug_server.js