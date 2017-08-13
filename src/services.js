var restify = require('restify');
var builder = require('botbuilder');
var services = {};
// Setup Restify Server
services.server = restify.createServer();
services.server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', services.server.name, services.server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
services.connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
services.server.post('/api/messages', services.connector.listen());

services.reply = function(session,text){
	if (text ==="hi!")
		session.send("bye");
	else
		session.send("You said: %s", text);
}

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
services.bot = new builder.UniversalBot(services.connector, function (session) {
 	services.reply(session, session.message.text)
});
module.exports = services;