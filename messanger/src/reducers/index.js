import { formatDate } from '../helper';
import { CHANGE_USER } from '../actions';
import { ADD_MESSAGE } from '../actions';
import { SET_LOOKED } from '../actions';
import { ADD_LINK, CHECK_LINK } from '../actions';
import { INIT_WS } from '../actions';
import { LOAD_DATA, SET_DATA } from '../actions';

const URL = 'ws://localhost:3030';
const initialState = {
	ws: new WebSocket(URL),
	wsConnected: false,
	current_user_id: 0,
	users: [{
		id: 0,
		name: "User 1"
	},{
		id: 1,
		name: "User 2"
	},{
		id: 2,
		name: "User 3"
	}],
	links: [/*{
		link: "https://youtu.be/RAUlcZXp23k",
		title: "some title of link"
	}*/],
	messages: [/*{
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
	}*/]
};
/*const URL = 'ws://localhost:3030';
let ws = new WebSocket(URL);
let wsConnected = false;
ws.onopen = () => {      
    console.log('connected')
	wsConnected = true;
}
ws.onmessage = evt => { 
	console.log(evt);
    //const message = JSON.parse(evt.data)
    //this.addMessage(message)
}
ws.onclose = () => {
	wsConnected = false;
    console.log('disconnected');
}*/
export default function MApp(state = initialState, action) {	
	let messg;
	switch (action.type) {
	case CHANGE_USER:		
		return {
			...state,
			current_user_id: action.id
		}
	case INIT_WS:	
		return {
			...state,
			wsConnected: action.connected
		}		
	case ADD_MESSAGE:	
		let mId = state.messages.length > 0 ? state.messages[state.messages.length-1].id+1: 0;
		let newMessage = {
			id: mId,
			message: action.message,
			looked: false,
			from_id: action.from_id,
			to_id: action.to_id,
			date: formatDate(new Date())
		};
		messg = { data: [...state.messages, newMessage], name: "messages" }
		state.wsConnected && state.ws.send(JSON.stringify(messg));
		return {
			...state,
			messages: [...state.messages, newMessage]
		}	
	case SET_LOOKED:	
		let nMessages = state.messages.map((ms)=>{
			let nMs = {...ms};
			if(ms.from_id == action.from_id && ms.to_id == ms.to_id){
				nMs.looked = true;
			}
			return nMs;
		});
		messg = { data: [...nMessages], name: "messages" }
		state.wsConnected && state.ws.send(JSON.stringify(messg));		
		return {
			...state,
			messages: [...nMessages]
		}		
	case ADD_LINK:				
		return {
			...state,
			links: [...state.links,
			{
				link: action.link,
				title: action.title
			}]
		}	
	case CHECK_LINK:					
		let fLinks = state.links.filter((lnk)=>{
			return action.link == lnk.link;
		});
		if(fLinks.length == 0){	
			messg = { data: action.link, name: "get", type: "link" }			
			state.wsConnected && state.ws.send(JSON.stringify(messg));				
		}	
		return {
			...state
		}		
	case LOAD_DATA:	
		messg = { name: "get", type: "all" }
		state.wsConnected && state.ws.send(JSON.stringify(messg));	
		return {
			...state
		}	
	case SET_DATA:
console.log(typeof action.messages, action.messages, "==----");	
		return {
			...state,
			messages: action.messages,
			links: action.links
		}			
    default:
      return state;
  }
}