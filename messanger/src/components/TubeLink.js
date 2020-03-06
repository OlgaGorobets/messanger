import React , { useState, useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import {useParams,withRouter,Link} from "react-router-dom";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { addLink, checkLink} from '../actions';

const mapStateToProps = state => {
    return {
		links: state.links
	};
};


const TubeLink = connect(mapStateToProps)(({ links,  link, dispatch}) => {
	const [linkData, setLinkData] = useState(null);
console.log(link, "link----->>>>>>//////", links);

	useEffect(() => {	
		let linksData = links.filter((lnk)=>{
			return lnk.link == link;
		});	
		if(linksData.length > 0){
			setLinkData({...linksData[0]});
		}
		else{
			dispatch(checkLink({
				link: link
			}));			
			/*getLinkTitle().then((response)=>{
				let result = response.data;
				console.log(result.error == false, result);
				if(result.error == false){
					dispatch(addLink({
						link: link
					}));				
				}				
			});*/
		}
	}, [links]);
	
	return(
	<ListGroup>
		<ListGroup.Item>
		{linkData !== null ? <>{linkData.title}</> : <Spinner animation="border" variant="secondary" />}
		</ListGroup.Item>
	</ListGroup>
)});


export default withRouter(TubeLink);