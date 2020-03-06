import React , { useState, useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import {useParams,withRouter,Link} from "react-router-dom";

import TubeLink from './TubeLink';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { addMessage, setLooked} from '../actions';
import { validURL } from '../helper';


const mapStateToProps = state => {
    return {
		current_user_id: state.current_user_id,
		users: state.users,
		messages: state.messages
	};
};


const MessagesBlock = connect(mapStateToProps)(({current_user_id, users, messages, dispatch }) => {	
	const [messageValue, setMessageValue] = useState("");
	let activeUsers = users.filter((us)=>{
		return us.id == parseInt(current_user_id);
	});
	let friends = users.filter((us)=>{
		return activeUsers.length > 0 && us.id !== parseInt(current_user_id);
	});
	let customFriend = friends.length > 0 ? friends[0] : null;	
	const [activeFrield, setActiveFrield] = useState(null);
	
	let setLookedMessages = ()=>{
			dispatch(setLooked({						
				from_id: activeFrield.id,
				to_id: current_user_id
			}));		
	}
	let changeFriend = (e, newFriend)=>{
		e.preventDefault();
		setActiveFrield({...newFriend});
	}
	let onFormSubmit = (e)=>{
		e.preventDefault();
		if(messageValue.trim().length > 0){
			dispatch(addMessage({
				message: messageValue,				
				from_id: current_user_id,
				to_id: activeFrield.id
			}));
			setMessageValue("");
		}
	}
	let onChange = (e)=>{
		setMessageValue(e.target.value);
	}	
	function validURL(str) {
	  let  pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	  return !!pattern.test(str);
	}	
	useEffect(() => {		
		setActiveFrield({...customFriend});		
	}, [customFriend]);
	return(
	<>
	<ListGroup>
		<Row>
			<Col className="messagesContainer">
				<ListGroup.Item>				
				{messages.filter((mes)=>{
					return (activeFrield && mes.from_id == parseInt(current_user_id) && mes.to_id == activeFrield.id) ||
					(activeFrield && mes.from_id == activeFrield.id && mes.to_id == parseInt(current_user_id));
				}).map((ms, index)=>{
					let mUsers = users.filter((us)=>{
						return us.id == activeFrield.id;
					});
					let mUser = mUsers.length > 0 ? mUsers[0] : null;
					const tube = ["."];
					
					let isYLinks = ms.message.indexOf(tube[0]) !== -1;
					
					return (<ListGroup.Item className={ms.from_id == parseInt(current_user_id) ? "messMy" : "messMe"} key={index} variant={ms.from_id !== parseInt(current_user_id) ? (ms.looked ? "" :  "info") : "light"}>
						<Row>{mUser && ms.from_id !== parseInt(current_user_id) ? <Col>{mUser.name}</Col> : <></>}</Row> 
						<Row>						
							<Col>{
							isYLinks ? 							
							<>{ms.message.split(" ").map((pt, index)=>{
							return (<div key={index}>{ (pt.indexOf(tube[0]) !== -1  && validURL(pt.replace("\\\n"," ").trim())) ? 
								<>
								<a href={pt.indexOf("http") == -1 ? "http://" + pt : pt} target="_blank">{pt}</a>
								<TubeLink {...{link: pt.replace("\\\n"," ").trim()}}/>
								</> : (pt + " ")}</div>)
							})}</>
							: ms.message
							}</Col>
							<Col>{ms.date}</Col>
						</Row>
					</ListGroup.Item>);
				})}
				</ListGroup.Item>
				{friends.length > 0?						
				<ListGroup.Item>
					<form onSubmit={onFormSubmit}>			
						<div><textarea
							type="text"				
							id="input01"				
							onChange={onChange}
							size="sm"
							value={messageValue}
							placeholder="Your message..."
							onClick={setLookedMessages}
						></textarea>
						</div>
						<button  onClick={onFormSubmit} type="submit" >Send Message</button>
					</form>
				</ListGroup.Item>				
				: <></>
				}				
			</Col>
			<Col className="friendsContainer">
			{friends.map((fr, index)=>{
				return (<ListGroup.Item onClick={(e)=>{changeFriend(e, fr);}} variant={activeFrield !== null && fr.id==activeFrield.id ? "info" : ""} key={index}>{fr.name}</ListGroup.Item>)
			})}
			</Col>
		</Row>
	</ListGroup>
	

	</>
)});


export default withRouter(MessagesBlock);