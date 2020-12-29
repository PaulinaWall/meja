/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {

	const { currentUser } = useAuth();

	return (
		<div>
			<Navbar bg="light" variant="light" >
				<Container>
					<Link to="/">Meja</Link>
					<Nav className="ml-auto">
						{
							currentUser ? (
								<NavLink className="nav-link" to="/signout">Sign out</NavLink>
							) : (
								<NavLink className="nav-link" to="/signin">Sign in</NavLink>
							)
						}
					</Nav>
				</Container>
			</Navbar>
		</div>
	)
}

export default Navigation
