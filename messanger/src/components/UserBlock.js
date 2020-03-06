import React from 'react';
import { connect } from 'react-redux';
import {useParams,withRouter,Link} from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { changeUser} from '../actions';

const mapStateToProps = state => {
    return {
		current_user_id: state.current_user_id,
		users: state.users
	};
};


const UserBlock = connect(mapStateToProps)(({ current_user_id, users, dispatch}) => {
	let user = users.filter((us)=>{
		return us.id == current_user_id;
	});
	let changeUserId = (e)=>{
		dispatch(changeUser(e.target.value));		
	}
	return(
	<ListGroup>
		<ListGroup.Item>
		<div className="userBlock">Current user: {user.length > 0 ? users[0].name : "Undefined user"}(id = {current_user_id})</div>
		<div className="userList">Avaliable users ids: {users.map((us)=>us.id).join(",")}</div>
		<div className="userIdChange">
			<span>Change Current User: </span>
			<input type="text" value={current_user_id} onChange={changeUserId} />
		</div>
		</ListGroup.Item>
	</ListGroup>
)});


export default withRouter(UserBlock);