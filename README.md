tinderforfood
=============

starting ionic http://ionicframework.com/getting-started/


Heroku
========
1. git remote add heroku git@heroku.com:tinderforfood.git
2. heroku login
3. enter your email
4. enter your password
5. git push heroku <your branch>:master
6. Done!

Deploy
========
Running your own instance of this repo

clone repo
npm install -g cordova ionic (gets you both ionic and cordova)
npm install from root (to get all dependencies)
bower install from www (to get bower components)
cordova platform add ios
cordova plugin add org.apache.cordova.device
cordova plugin add org.apache.cordova.statusbar
cordova plugin add org.apache.cordova.inappbrowser
cordova plugin add org.apache.cordova.network-information
ionic build ios
ionic emulate ios
