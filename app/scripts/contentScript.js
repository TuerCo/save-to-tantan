'use strict';

var messageId = null;

window.addEventListener('message', function (event) {
    if (event.source === window &&
        typeof event.data.direction !== 'undefined' &&
        event.data.direction === 'from-page-script') {
            if(messageId !== event.data.messageId){
                messageId = event.data.messageId;
                if(event.data.token){
                    chrome.runtime.sendMessage({ token: event.data.token });
                } else if (event.data.logout){
                    chrome.runtime.sendMessage({ logout: event.data.logout });
                }
            }
    }
});

