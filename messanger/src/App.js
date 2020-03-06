import React, { useState, useEffect, Component } from "react";

import { Route,Link,withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Blocks from './components/Blocks';

import './styles/main.scss';


function App({location}) {	
	useEffect(() => {
			
	}, []);		
    return (
		<Container>
			<div className="headerBlock">	
				<Link className="mainLogoLink" to="/"><h1 className="mainLogo">Messanger</h1></Link>					
			</div>	
			<div className="contentBlock">			
				<Route exact path="/" component={Blocks} />								
			</div>	 			
		</Container>
    );
}

export default withRouter(App);
