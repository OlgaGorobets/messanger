export const CHANGE_USER = 'CHANGE_USER';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_LOOKED = 'SET_LOOKED';
export const ADD_LINK = 'ADD_LINK';
export const CHECK_LINK = 'CHECK_LINK';
export const INIT_WS = 'INIT_WS';
export const LOAD_DATA = 'LOAD_DATA';
export const SET_DATA = 'SET_DATA';

export function changeUser(id) {
	return {
		type: CHANGE_USER,
		id: id
	};
}

export function addMessage(data) {
	return {
		type: ADD_MESSAGE,
		message: data.message,		
		from_id: data.from_id,
		to_id: data.to_id
	};
}

export function setLooked(data) {
	return {
		type: SET_LOOKED,
		from_id: data.from_id,
		to_id: data.to_id
	};
}

export function addLink(data) {
	return {
		type: ADD_LINK,
		title: data.title,
		link: data.link
	};
}
export function checkLink(data) {
	return {
		type: CHECK_LINK,
		link: data.link
	};
}

export function initWS(connected) {
	return {
		type: INIT_WS,
		connected: connected
	};
}

export function loadData() {
	return {
		type: LOAD_DATA
	};
}

export function setData(messages, links) {
	return {
		type: SET_DATA,
		messages: messages,
		links: links
	};
}