'use strict';

if(typeof chrome.runtime.onMessageExternal !== 'undefined') {
    chrome.runtime.onInstalled.addListener(function (details) {
        console.log('version', details.previousVersion);
    });
    chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
        if (request) {
            if (request.token) {
                chrome.storage.local.set({'token': request.token}, function() {
                    // Notify that we saved.
                    chrome.extension.getBackgroundPage().console.log('listening to app');
                    sendResponse({});
                    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                        //chrome.tabs.getCurrent(function (tab) {
                        var tab = tabs[0];
                        chrome.tabs.remove(tab.id, function(){

                        });
                    });
                });
            } else if (request.logout){
                chrome.storage.local.remove('token', function() {});
            }
        }
        return true;
    });
} else {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        chrome.extension.getBackgroundPage().console.log(request);
        if (request) {
            if (request.token) {
                chrome.storage.local.set({'token': request.token}, function() {
                    // Notify that we saved.
                    chrome.extension.getBackgroundPage().console.log('listening to app');
                    //sendResponse({});
                    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                        //chrome.tabs.getCurrent(function (tab) {
                        var tab = tabs[0];
                        chrome.tabs.remove(tab.id, function(){

                        });
                    });


                });
            }  else if (request.logout){
                chrome.storage.local.remove('token', function() {});
            }
        }
        return true;
    });
}
