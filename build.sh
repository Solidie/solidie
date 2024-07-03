#!/bin/bash

cd ../Materials
git pull

cd ../solidie
git pull

cd ../solidie-pro
git pull

cd ../solidie
npm i
npm run build

cd ../solidie-pro
npm i
npm run build
