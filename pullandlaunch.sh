#!/bin/bash

echo ""
echo "Getting latest HOTBOT!"

echo ""
echo "****** Pulling ******"
git pull origin main
echo "******* Done! *******"
echo ""
echo "** Launching HOTBOT! **"
echo ""
node hotbot.js
echo "******* EXIT! *******"
echo ""

