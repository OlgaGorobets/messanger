let express = require('express');
let app = express();
let bodyParser = require('body-parser');

import { formatDate } from '../messanger/src/helper';

/*
app.use(bodyParser.urlencoded({
   extended: false
}));

app.post('/link', (req, res) => {
  console.log(req.body, "req");
  //res.status(201).json();
});
app.listen(5000, function(){
	console.log('Node HTTP server is listening');
});*/

let links = [{
		link: "https://youtu.be/RAUlcZXp23k",
		title: "testing title"
	}],
	messages = [{
		id: 0,
		message: "text of message1",
		date: formatDate(new Date()),
		looked: false,
		from_id: 0,
		to_id: 1
	},{
		id: 1,
		message: "text of message2 https://youtu.be/RAUlcZXp23k",
		date: formatDate(new Date()),
		looked: true,
		from_id: 0,
		to_id: 1
	},
	{
		id: 2,
		message: "text of message3",
		date: formatDate(new Date()),
		looked: true,
		from_id: 1,
		to_id: 0
	},
	{
		id: 3,
		message: "text of message4",
		date: formatDate(new Date()),
		looked: false,
		from_id: 1,
		to_id: 0
	}];

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3030 });
let getTitleAtUrl = require('get-title-at-url');
console.log("init wss");
wss.on('connection', function connection(ws) {
	console.log("connected");
  ws.on('message', function incoming(data) {
		let obj = JSON.parse(data);
		wss.clients.forEach(function each(client) {
		if (client !== ws && client.readyState === WebSocket.OPEN) {
			if(obj.name !== "get"){
				console.log(obj, "obj");
				//console.log(data, "sending-data");
				client.send(JSON.stringify({name: "change"}));
			}
		}
		else{
			
			if(obj.name == "get"){
				if(obj.type == "link"){
					let url = obj.data;
					if(url.indexOf("http") == -1){
						url = "http://" + url;
					}
					getTitleAtUrl(url, function(title){
						client.send(JSON.stringify({title: title, link: obj.data, name: "link"}));
					});					
				}
				else if(obj.type == "all"){
					client.send(JSON.stringify({messages: messages, links: links, name: "load"}));
				}
				
			}
			else if(obj.name == "messages"){
				messages = obj.data;
			}
			else if(obj.name == "links"){
				links = obj.data;
			}			
			
		}
    });
  });
});