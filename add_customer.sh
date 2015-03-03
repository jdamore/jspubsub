#!/bin/sh
echo $*
curl -v -H "Content-Type: application/json" -X POST -d '{"name":$1, "email":$2}' http://127.0.0.1:3000
curl -v -H "Content-Type: application/json" -X GET -d http://127.0.0.1:3000