#!/bin/bash

suiteType=$1

echo "---------npm installation-----------"

export PATH=/usr/local/opt/node@10/bin:$PATH
npm install

if [ $suiteType == "smoke" ]
then
	echo "running employee web smoke tests"
	npm run web:emp
elif [ $suiteType == "all" ]
then
	echo "running employee web functional tests"
	npm run web:emp
else
	echo "there is no tests to run............................"
fi


EXIT_CODE=$?