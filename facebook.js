'use strict';
// See the Send API reference
// https://developers.facebook.com/docs/messenger-platform/send-api-reference
const request = require('request');
const CONFIG = require('./const.js');
module.exports = (function(){
    let facebook_function = {
        //Sending request for sender details(name)
        getName : function(sender,callback)
        {
            console.log("fb get name");
            request({
                    url: "https://graph.facebook.com/v2.6/" + sender,
                    qs: {
                        access_token : CONFIG.FB_PAGE_TOKEN
                    },
                    method: "GET",
                },
                function(error, response, body) {
                    if(error) {
                        console.log("error getting username")
                    }
                    else {
                        let bodyObj = JSON.parse(body);
                        // console.log(JSON.stringify(bodyObj,null,2));
                        let name = "";
                        if(bodyObj.first_name)
                            name = bodyObj.first_name;
                        // console.log("Name",name);
                        callback(name);
                    }
                }
            );
        },
        //sending message request to facebook via graph api
        sendRequest : function(sender,messageData)
        {
            request(
                {
                    url: 'https://graph.facebook.com/v2.6/me/messages',
                    qs: {access_token: CONFIG.FB_PAGE_TOKEN},
                    method: 'POST',
                    json: {
                        recipient: {id: sender},
                        message: messageData
                    }
                },
                function (error, response) {
                    if (error) {
                        console.log('Error sending message: ', error);
                    } else if (response.body.error) {
                        console.log('Error: ', response.body.error);
                    }
                }
            );
        },
        sendBubble : function(sender)
        {
            request(
                {
                    url: 'https://graph.facebook.com/v2.6/me/messages',
                    qs: {access_token: CONFIG.FB_PAGE_TOKEN},
                    method: 'POST',
                    json: {
                        recipient: {id: sender},
                        "sender_action": "typing_on"
                    }
                },
                function (error, response) {
                    if (error)
                    {
                        console.log('Error sending message: ', error);
                    }
                    else if (response.body.error)
                    {
                        console.log('Error: ', response.body.error);
                    }
                }
            );
        }
        
    };
    return facebook_function;
})();