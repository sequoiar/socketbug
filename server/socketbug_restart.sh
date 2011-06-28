#!/bin/bash
#
# description: Socketbug Server - Restart
# author: Manifest Interactive, LLC

# Get Current Directory
BASEDIR=$(dirname $0)

# Restart Server
forever restart $BASEDIR/socketbug_server.js