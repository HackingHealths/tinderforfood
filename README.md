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

1. clone repo
2. npm install -g cordova ionic (gets you both ionic and cordova)
3. npm install from root
4. bower install
5. cordova platform add ios
6. cordova platform add android
6. cordova plugin add org.apache.cordova.device
7. cordova plugin add org.apache.cordova.statusbar
8. cordova plugin add org.apache.cordova.inappbrowser
9. cordova plugin add org.apache.cordova.network-information
10. ionic build ios
11. ionic emulate ios
