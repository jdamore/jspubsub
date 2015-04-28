#!/bin/sh

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <name> <email>" >&2
  exit 1
fi

echo Will add customer with name=$1 and email=$2
curl -v -H "Content-Type: application/json" -X POST -d "{\"name\":\"$1\", \"email\":\"$2\"}" http://127.0.0.1:3000

echo Check customer has been created
curl -v http://127.0.0.1:3000/$1

echo Check welcome email has been sent
curl -v http://127.0.0.1:3001/$2