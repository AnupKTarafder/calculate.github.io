#!/bin/bash
ng build --configuration=production

cp -r dist/browser/* dist

rm -rf dist/browser

mv dist/index.html ./

x=$(cat index.html)

x="${x//<script src=\"/<script src=\"dist/}"
x="${x//favicon.ico/dist/favicon.ico}"
x="${x//<link rel=\"modulepreload\" href=\"/<link rel=\"modulepreload\" href=\"dist/}"


echo "$x" > index.html
