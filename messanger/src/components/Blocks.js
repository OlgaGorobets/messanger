import React , { useState, useEffect,useRef } from 'react';
import { connect } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import UserBlock from './UserBlock';
import MessagesBlock from './MessagesBlock';

import { addLink, initWS, checkLink, loadData, setData} from '../actions';


const mapStateToProps = state => {
    return {
		ws: state.ws
	};
};

const Blocks = connect(mapStateToProps)(({ ws, dispatch }) => {
	useEffect(() => {
		console.log("init blocks");
		ws.onopen = () => {      			
			dispatch(initWS(true));	
			dispatch(loadData());			
			console.log('ws connected');
		}
		ws.onmessage = evt => { 
			if(evt.isTrusted && evt.data){
				let obj = JSON.parse(evt.data);
				if(obj.name == "link"){
					dispatch(addLink({
						link: obj.link,
						title: obj.title
					}));					
				}
				else if(obj.name == "load"){
					dispatch(setData(obj.messages, obj.links));					
				}
				else if(obj.name == "change"){
					dispatch(loadData());
				}
			}
			console.log(evt, "getting message");
		}
		ws.onclose = () => {
			dispatch(initWS(false));	
			console.log('ws disconnected');
		}
	}, []);	
	return(
		<>	
			<UserBlock/>
			<MessagesBlock/>			
		</>		
)});


export default Blocks;