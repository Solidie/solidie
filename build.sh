#!/bin/bash

cd ../solidie-materials
git pull

cd ../solidie
git pull

cd ../solidie-pro
git pull

cd ../solidie
npm i
composer update
npm run build

cd ../solidie-pro
npm i
composer update
npm run build
