#!/bin/bash
read -p "This will uninstall all your packages, are you sure? (yN)" SURE
if ! [ "x$SURE" = "xy" ] && ! [ "x$SURE" = "xY" ]; then
  echo "aborting"
  exit 1
fi
